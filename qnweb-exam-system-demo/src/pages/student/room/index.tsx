import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Button, Divider, message, Modal, Progress,
} from 'antd';
import {
  InviteSignaling,
  MixStreamTool, RtmManager, ScreenMicSeat,
} from 'qnweb-high-level-rtc';
import moment from 'moment';
import { useInterval, useUnmount } from 'ahooks';
import { useHistory } from 'react-router-dom';
import { QNCameraVideoTrack, QNLocalVideoTrack, QNRemoteVideoTrack } from 'qnweb-rtc';
import useQNIM from '@/hooks/useQNIM';
import { IM_APPKEY } from '@/config';
import useMtTrackRoom from '@/hooks/useMtTrackRoom';
import SheetCard from '@/components/sheet-card';
import SingleChoiceSubject from '@/components/single-choice-subject';
import useExamInfo from '@/hooks/useExamInfo';
import useBaseRoomHeartbeat from '@/hooks/useBaseRoomHeartbeat';
import useExamPaper from '@/hooks/useExamPaper';
import QrCodePopup from '@/components/qr-code-popup';
import useJoinMtTrackRoom from '@/hooks/useJoinMtTrackRoom';
import { getUrlQueryParams, isInvitationSignal, log, pandora } from '@/utils';
import styles from './index.module.scss';
import { userStoreContext } from '@/store/UserStore';
import ExamApi from '@/api/ExamApi';
import AIApi from '@/api/AIApi';
import { QNAuthoritativeFaceComparer, QNFaceDetector, QNRtcAiManager } from 'qnweb-rtc-ai';

type TAnswer = {
  questionId: string;
  value?: string
};

log.setPreTitle('[StudentRoom]');

const StudentRoom = () => {
  const history = useHistory();
  const userStore = useContext(userStoreContext);
  const urlQueryRef = useRef({
    examId: getUrlQueryParams('examId') || '',
    roomId: getUrlQueryParams('roomId') || '',
  });
  const { micSeats: mtTrackRoomMicSeats, room: mtTrackRoom } = useMtTrackRoom();
  const { joinRoom: joinMtTrackRoom, imConfig } = useJoinMtTrackRoom();
  const [isMtTrackRoomJoined, setIsMtTrackRoomJoined] = useState(false);
  const { examInfo } = useExamInfo(urlQueryRef.current.examId);

  // 考场信息
  const [countDown, setCountDown] = useState(0); // 倒计时(ms)
  const { questions, totalScore } = useExamPaper(urlQueryRef.current.examId);
  const [answer, setAnswer] = useState<TAnswer[]>([]);
  const mixStreamToolRef = useRef<MixStreamTool>();
  const [isEnableMergeStream, setIsEnableMergeStream] = useState(false);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(true);
  const latestMobileSeat = useMemo(
    () => mtTrackRoomMicSeats.slice().reverse().find(
      (s) => s.userExtension?.userExtRoleType === 'mobile',
    ),
    [mtTrackRoomMicSeats],
  );
  const { loginIM, imClient } = useQNIM(IM_APPKEY);

  useEffect(() => {
    mtTrackRoomMicSeats.forEach(
      (seat) => {
        if (!seat.isMySeat && seat.isOwnerOpenAudio) {
          mtTrackRoom.setUserMicrophoneWindowView(
            seat.uid,
            'teacher-microphone',
          );
        }
      },
    );
  }, [mtTrackRoom, mtTrackRoomMicSeats]);

  /**
   * im消息监听
   */
  useEffect(() => {
    const listener = (msg: string) => {
      const signaling = JSON.parse(msg);
      if (isInvitationSignal(signaling)) {
        const isMsgToMe = signaling.data.receiver === userStore.state.userInfo?.accountId;
        if (isMsgToMe && signaling.action === 'invite_send') {
          Modal.confirm({
            title: '老师请求语音通话',
            onOk: () => {
              const acceptSignaling: InviteSignaling = {
                ...signaling,
                action: 'invite_accept',
              };
              imClient.sendChannelMsg(
                JSON.stringify(acceptSignaling),
                `${imConfig?.imGroupId}`,
                true,
              );
            },
            onCancel() {
              const acceptSignaling: InviteSignaling = {
                ...signaling,
                action: 'invite_cancel',
              };
              imClient.sendChannelMsg(
                JSON.stringify(acceptSignaling),
                `${imConfig?.imGroupId}`,
                true,
              );
            },
          });
        }
      }
    };
    RtmManager.addRtmChannelListener(listener);
    return () => {
      RtmManager.removeRtmChannelListener(listener);
    };
  }, [imClient, imConfig?.imGroupId, userStore.state.userInfo?.accountId]);

  /**
   * 监控visibilitychange
   */
  useEffect(() => {
    const handleVisibilitychange = () => {
      ExamApi.reportCheating({
        examId: urlQueryRef.current.examId,
        userId: userStore.state.userInfo?.accountId || '',
        event: {
          action: 'visibilitychange',
          value: document.visibilityState,
        },
      });
    };
    window.addEventListener('visibilitychange', handleVisibilitychange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [userStore.state.userInfo?.accountId]);

  /**
   * 权威人脸对比
   */
  const checkAuthFaceCompare = (
    track: QNLocalVideoTrack | QNRemoteVideoTrack,
    userId: string,
    examId: string,
  ) => QNAuthoritativeFaceComparer.run(
    track,
    {
      idcard: localStorage.getItem('idCard') || '',
      realname: localStorage.getItem('fullName') || '',
    },
  ).then((result) => ExamApi.reportCheating({
    examId,
    userId,
    event: {
      action: 'authFaceCompare',
      value: `${result.response.similarity}`,
    },
  }));

  /**
   * 人脸对比
   */
  const checkFaceDetect = (
    track: QNLocalVideoTrack | QNRemoteVideoTrack,
    userId: string,
    examId: string,
  ) => QNFaceDetector.run(track).then((result) => ExamApi.reportCheating({
    examId,
    userId,
    event: {
      action: 'faceDetect',
      value: `${result.response.num_face}`,
    },
  }));

  /**
   * 定时监控:
   * 权威人脸对比监控
   * 多人同框监控
   */
  useInterval(() => {
    const userId = userStore.state.userInfo?.accountId || '';
    const localCameraTrack = mtTrackRoom.getUserCameraTrack(userId) as QNCameraVideoTrack;
    const { examId } = urlQueryRef.current;
    if (localCameraTrack && userId) {
      // 权威人脸对比监控
      checkAuthFaceCompare(localCameraTrack, userId, examId);
      // 人脸对比
      checkFaceDetect(localCameraTrack, userId, examId);
    }
  }, 3000);

  // 获取aiToken
  useEffect(() => {
    AIApi.getToken().then((result) => {
      QNRtcAiManager.init(result.aiToken);
    });
  }, []);

  /**
   * 房间心跳
   */
  const { setIsEnabled } = useBaseRoomHeartbeat({
    roomId: urlQueryRef.current.roomId,
  });

  /**
   * 开始创建合流任务
   */
  useEffect(() => {
    if (isMtTrackRoomJoined && mtTrackRoom) {
      mixStreamToolRef.current = mtTrackRoom.getMixStreamTool();
      mixStreamToolRef.current.startMixStreamJob({
        width: 400,
        height: 400,
      })?.then(() => {
        setIsEnableMergeStream(true);
      });
    }
  }, [isMtTrackRoomJoined, mtTrackRoom, userStore.state.userInfo]);

  /**
   * 屏幕共享合流
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const handler = {
      onScreenMicSeatAdd(seat: ScreenMicSeat) {
        log.log('onScreenMicSeatAdd', seat);
        mixStreamToolRef.current?.updateUserScreenMergeOptions(
          seat.uid,
          {
            x: 200,
            y: 0,
            width: 200,
            height: 200,
          },
        );
      },
    };
    if (mtTrackRoom) {
      mtTrackRoom.getScreenTrackTool().addScreenMicSeatListener(handler);
      return () => {
        mtTrackRoom.getScreenTrackTool().removeScreenMicSeatListener(handler);
      };
    }
  }, [mtTrackRoom]);

  /**
   * 合流h5端副摄像头
   */
  useEffect(() => {
    if (!isEnableMergeStream) return;
    if (latestMobileSeat) {
      const mobileUserId = latestMobileSeat.uid;
      mixStreamToolRef.current?.updateUserCameraMergeOptions(
        mobileUserId,
        {
          x: 100,
          y: 200,
          width: 200,
          height: 200,
        },
      );
    }
  }, [isEnableMergeStream, latestMobileSeat]);

  /**
   * 合流本地摄像头
   */
  useEffect(() => {
    if (!isEnableMergeStream) return;
    const localMtRoomSeat = mtTrackRoomMicSeats.find(
      (s) => s.uid === userStore.state.userInfo?.accountId,
    );
    if (localMtRoomSeat) {
      const localUserId = localMtRoomSeat.uid;
      mixStreamToolRef.current?.updateUserCameraMergeOptions(
        localUserId,
        {
          x: 0,
          y: 0,
          width: 200,
          height: 200,
        },
      );
    }
  }, [
    isEnableMergeStream,
    mtTrackRoomMicSeats,
    userStore.state.userInfo?.accountId,
  ]);

  /**
   * 答案数量和问题数量匹配
   */
  useEffect(() => {
    setAnswer(
      questions.map((question) => ({
        questionId: question.questionId,
      })),
    );
  }, [questions]);

  /**
   * 更新倒计时
   */
  useEffect(() => {
    const result = examInfo?.endTime ? moment(examInfo?.endTime).diff(moment(), 'milliseconds')
      : 0;
    setCountDown(result);
  }, [examInfo?.endTime]);

  /**
   * 开启麦克风、摄像头、屏幕共享
   */
  useEffect(() => {
    if (mtTrackRoom && isMtTrackRoomJoined) {
      Promise.all([
        mtTrackRoom
          .enableCamera()
          .then(() => mtTrackRoom.setLocalCameraWindowView(
            'pc-camera',
          ))
          .catch(() => Promise.reject(new Error('摄像头开启失败'))),
        mtTrackRoom
          .enableMicrophone()
          .catch(() => Promise.reject(new Error('麦克风开启失败'))),
        mtTrackRoom
          .getScreenTrackTool()
          .enableScreen()
          .catch(() => Promise.reject(new Error('屏幕共享开启失败'))),
      ]).catch((error) => {
        Modal.error({
          title: '媒体设备开启失败',
          content: error.message,
        });
      });
    }
  }, [isMtTrackRoomJoined, mtTrackRoom]);

  /**
   * 移动端摄像头预览
   */
  useEffect(() => {
    log.log('latestMobileSeat', latestMobileSeat);
    if (mtTrackRoom && latestMobileSeat?.isOwnerOpenVideo) {
      mtTrackRoom.setUserCameraWindowView(
        latestMobileSeat.uid,
        'mobile-camera',
      );
    }
  }, [mtTrackRoom, latestMobileSeat]);

  /**
   * 进入房间
   */
  useEffect(() => {
    if (mtTrackRoom) {
      const hide = message.loading('正在加入房间...', 0);
      loginIM({
        account: userStore.state.imConfig?.imUsername || '',
        password: userStore.state.imConfig?.imPassword || '',
      })
        .then(() => joinMtTrackRoom({
          room: mtTrackRoom,
          roomId: urlQueryRef.current.roomId,
          userExtension: {
            userExtRoleType: 'pc',
          },
        }))
        .then(() => {
          setIsMtTrackRoomJoined(true);
          setIsEnabled(true);
          message.success('房间加入成功');
        })
        .then(() => ExamApi.join(urlQueryRef.current))
        .then(() => {
          message.success('开始考试');
          pandora.report({
            action: 'start_exam',
            value: {
              userId: pandora.getCacheValue('userId'),
              role: pandora.getCacheValue('role'),
              pathname: pandora.getCacheValue('pathname'),
              examId: urlQueryRef.current.examId,
            },
          });
        })
        .finally(() => hide());
    }
  }, [
    joinMtTrackRoom, loginIM, mtTrackRoom,
    setIsEnabled, userStore.state.imConfig?.imPassword,
    userStore.state.imConfig?.imUsername,
  ]);

  /**
   * 离开房间
   */
  useUnmount(() => {
    mtTrackRoom?.leaveRoom()
      .then(() => {
        log.log('leaveRoom success');
      });
  });

  /**
   * 倒计时
   */
  useInterval(() => {
    setCountDown(countDown - 1000);
  }, 1000);

  /**
   * 选择答案
   * @param currentQuestionIndex
   * @param currentQuestionValue
   */
  const onChooseAnswer = (currentQuestionIndex: number, currentQuestionValue: string) => {
    const newAnswer = answer.map(
      (answerItem, i) => (i === currentQuestionIndex ? {
        ...answerItem,
        value: currentQuestionValue,
      } : answerItem),
    );
    setAnswer(newAnswer);
  };

  /**
   * 提交试卷
   */
  const onSubmitPaper = () => {
    pandora.report({
      action: 'commit_exam_paper',
      value: {
        userId: pandora.getCacheValue('userId'),
        role: pandora.getCacheValue('role'),
        pathname: pandora.getCacheValue('pathname'),
        examId: urlQueryRef.current.examId,
      },
    });
    const hide = message.loading('正在提交试卷', 0);
    const answerList = answer.map((a) => ({
      questionId: a.questionId,
      textList: [a.value || ''],
    }));
    ExamApi.submitAnswer({
      examId: urlQueryRef.current.examId,
      answerList,
    })
      .then((res) => {
        if (res.result) return message.success('提交试卷成功');
        return message.error('提交试卷失败');
      })
      .then(() => ExamApi.leave({
        examId: urlQueryRef.current.examId,
      }))
      .finally(() => {
        hide();
        history.push('/student/list');
      });
  };

  /**
   * 退出答题
   */
  const onExitExam = () => {
    pandora.report({
      action: 'quit_answer_questions',
      value: {
        userId: pandora.getCacheValue('userId'),
        role: pandora.getCacheValue('role'),
        pathname: pandora.getCacheValue('pathname'),
        examId: urlQueryRef.current.examId,
      },
    });
    Modal.confirm({
      title: '提示',
      content: '考试还未结束，请确认是否退出答题，答题内容将不会被保留',
      cancelText: '取消',
      closable: true,
      onOk() {
        ExamApi.leave({
          examId: urlQueryRef.current.examId,
        }).then(() => {
          history.push('/student/list');
        });
      },
    });
  };

  // 当前答题进度, 值为已作答题数量
  const currentProgress = useMemo(
    () => answer.map((a) => a.value).filter((v) => v).length,
    [answer],
  );

  return (
    <div className={styles.container}>
      <div id="teacher-microphone" />
      <QrCodePopup
        className={styles.qrCodePopup}
        visible={isQrCodeVisible}
        qrCodeUrl={`${window.location.origin}/mobile-camera?roomId=${urlQueryRef.current.roomId}`}
        onZoomIn={() => setIsQrCodeVisible(false)}
        onZoomOut={() => setIsQrCodeVisible(true)}
      />
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <div id="pc-camera" className={styles.pcCamera}>
            <span className={styles.cameraTip}>电脑摄像</span>
          </div>
          <div id="mobile-camera" className={styles.mobileCamera}>
            <span className={styles.cameraTip}>副摄像头画面</span>
          </div>
          <div className={styles.examDetail}>
            <div className={styles.examDetailTime}>
              <div className={styles.examDetailTimeTip}>剩余时间</div>
              <div className={styles.examDetailTimeCount}>
                {
                  moment({
                    h: moment.duration(countDown, 'milliseconds').hours(),
                    m: moment.duration(countDown, 'milliseconds').minutes(),
                    s: moment.duration(countDown, 'milliseconds').seconds(),
                  }).format('HH:mm:ss')
                }
              </div>
            </div>
            <Divider className={styles.dividerLine} />
            <div className={styles.examProgress}>
              <div className={styles.examProgressTip}>当前进度</div>
              <div className={styles.examProgressCurrent}>
                {currentProgress}
                /
                {questions.length}
              </div>
              <Progress
                percent={+((currentProgress / questions.length) * 100).toFixed(1)}
                className={styles.examProgressBar}
              />
            </div>
          </div>
          <SheetCard
            questionCount={questions.length}
            totalScore={totalScore || 0}
            answer={answer.map((answerItem) => !!answerItem.value?.length)}
          />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideHeader}>
            <div className={styles.banner} style={{ display: 'none' }}>
              <span>监考状态: 副摄像头关闭</span>
              <span>监考老师正在与你进行语音提醒</span>
            </div>
            <div className={styles.buttons}>
              <Button type="primary" className={styles.button} onClick={onSubmitPaper}>提交试卷</Button>
              <Button type="primary" className={styles.button} onClick={onExitExam}>退出答题</Button>
            </div>
          </div>
          <div className={styles.question}>
            <div className={styles.topic}>
              {
                questions.map((question, index) => (
                  <SingleChoiceSubject
                    value={answer[index]?.value}
                    onChange={(event) => onChooseAnswer(index, event.target.value)}
                    title={`第${index + 1}题: ${question.desc}`}
                    options={question.choiceList || []}
                    style={{ marginBottom: 20 }}
                    key={question.questionId}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRoom;
