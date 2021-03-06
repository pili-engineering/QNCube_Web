import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Button, message, Modal,
} from 'antd';
import {
  ClientRoleType,
  InviteSignaling,
  RtmManager,
} from 'qnweb-high-level-rtc';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useInterval, useMount } from 'ahooks';
import {
  QNBrowserTabDetector,
  QNCamera,
  QNMicrophone,
  QNMultiplePeopleDetector,
  QNScreen,
  QNUserTakerDetector
} from 'qnweb-exam-sdk';
import {
  QNCameraVideoTrack,
  QNMicrophoneAudioTrack,
  QNRemoteAudioTrack,
  QNRemoteVideoTrack,
  QNScreenVideoTrack,
  QNTrack
} from 'qnweb-rtc';
import { TrackInfoPanel, TrackInfoPanelProps } from 'qnweb-cube-ui';
import 'qnweb-cube-ui/dist/index.css'

import useQNIM from '@/hooks/useQNIM';
import { IM_APPKEY } from '@/config';
import SheetCard from '@/components/sheet-card';
import SingleChoiceSubject from '@/components/single-choice-subject';
import useExamInfo from '@/hooks/useExamInfo';
import useExamPaper from '@/hooks/useExamPaper';
import QrCodePopup from '@/components/qr-code-popup';
import { getUrlQueryParams, isInvitationSignal, log } from '@/utils';
import { userStoreContext } from '@/store/UserStore';
import ExamApi from '@/api/ExamApi';
import AIApi from '@/api/AIApi';
import useExamSDK from '@/hooks/useExamSDK';
import {
  quitAnswerQuestionsReport,
  commitExamPaperReport,
} from './utils';
import ScheduleCard from './schedule-card';
import useRoomJoin from '@/hooks/useRoomJoin';
import useRoomHeart from '@/hooks/useRoomHeart';
import useMixStreamJob from '@/hooks/useMixStreamJob';

import styles from './index.module.scss';

type Answer = {
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
  const { examInfo } = useExamInfo(urlQueryRef.current.examId);

  // ????????????
  const [timeRemaining, setTimeRemaining] = useState(0); // ????????????, ms
  const { questions, totalScore } = useExamPaper(urlQueryRef.current.examId);
  const [answer, setAnswer] = useState<Answer[]>([]);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(true);
  const { loginIM, imClient, joinChatroom } = useQNIM(IM_APPKEY);

  const { examClient } = useExamSDK();
  const { joinRoomApi, rtcInfo, imConfig } = useRoomJoin();
  const { enableHeart, enabled } = useRoomHeart();
  const { startMixStreamJob, updateMixStreamJob } = useMixStreamJob(examClient.rtcClient);

  const [publishedTracks, setPublishedTracks] = useState<QNTrack[]>([]);
  const [trackInfo, setTrackInfo] = useState<TrackInfoPanelProps>();

  /**
   * ????????????
   */
  useMount(() => {
    const hide = message.loading('RTC?????????...', 0);
    const camera = QNCamera.create({
      elementId: 'pc-camera',
    });
    const microphone = QNMicrophone.create();
    const screen = QNScreen.create();

    // tab???????????????
    const browserTabDetector = QNBrowserTabDetector.create();
    // ?????????????????????
    const userTakerDetector = QNUserTakerDetector.create({
      interval: 3000,
      idCard: localStorage.getItem('idCard') || '',
      realName: localStorage.getItem('fullName') || '',
    });
    // ?????????????????????
    const multiplePeopleDetector = QNMultiplePeopleDetector.create({
      interval: 3000
    });

    userTakerDetector.on(result => {
      ExamApi.reportCheating({
        examId: urlQueryRef.current.examId,
        userId: userStore.state.userInfo?.accountId || '',
        event: {
          action: 'authFaceCompare',
          value: `${result}`
        },
      });
    });
    browserTabDetector.on(result => {
      ExamApi.reportCheating({
        examId: urlQueryRef.current.examId,
        userId: userStore.state.userInfo?.accountId || '',
        event: {
          action: 'visibilitychange',
          value: result
        },
      });
    });
    multiplePeopleDetector.on(result => {
      ExamApi.reportCheating({
        examId: urlQueryRef.current.examId,
        userId: userStore.state.userInfo?.accountId || '',
        event: {
          action: 'faceDetect',
          value: `${result}`,
        },
      });
    });

    examClient.registerDevice('camera', camera);
    examClient.registerDevice('microphone', microphone);
    examClient.registerDevice('screen', screen);

    examClient.enable(browserTabDetector);
    examClient.enable(userTakerDetector, 'camera');
    examClient.enable(multiplePeopleDetector, 'camera');

    Promise.all([
      AIApi.getToken(),
      joinRoomApi(urlQueryRef.current.roomId)
    ]).then(([{ aiToken }, { rtcInfo }]) => {
      const rtcToken = rtcInfo?.roomToken || '';
      return examClient.start({
        aiToken,
        rtcToken,
        userData: JSON.stringify({
          clientRoleType: ClientRoleType.CLIENT_ROLE_BROADCASTER,
          uid: userStore.state.userInfo?.accountId || '',
          userExtRoleType: 'pc'
        })
      });
    }).then(() => ExamApi.join(urlQueryRef.current)).then(() => {
      message.success('RTC????????????');
      const tracks = [];
      if (camera.cameraVideoTrack) {
        tracks.push(camera.cameraVideoTrack);
      }
      if (microphone.microphoneAudioTrack) {
        tracks.push(microphone.microphoneAudioTrack);
      }
      if (screen.screenVideoTrack) {
        tracks.push(screen.screenVideoTrack);
      }
      setPublishedTracks(tracks);
      return enableHeart(urlQueryRef.current.roomId);
    }).catch(error => {
      console.error(error);
      Modal.error({
        content: error.message,
      });
    }).finally(() => {
      hide();
    });
  });

  // track ????????????
  useInterval(() => {
    setTrackInfo({
      videoStatus: (publishedTracks.find(track => track.tag === 'camera') as QNCameraVideoTrack)?.getStats()[0],
      audioStatus: (publishedTracks.find(track => track.tag === 'microphone') as QNMicrophoneAudioTrack)?.getStats(),
      screenStatus: (publishedTracks.find(track => track.tag === 'screen') as QNScreenVideoTrack)?.getStats()[0],
    })
  }, publishedTracks.length > 0 ? 1000 : undefined);

  /**
   * im
   */
  useEffect(() => {
    if (imConfig?.imGroupId) {
      const hide = message.loading('IM?????????...', 0);
      loginIM({
        account: userStore.state.imConfig?.imUsername || '',
        password: userStore.state.imConfig?.imPassword || '',
      }).then(() => {
        console.log('imConfig?.imGroupId', imConfig?.imGroupId);
        return joinChatroom({
          chatroomId: `${imConfig?.imGroupId || ''}`
        });
      }).then(() => {
        message.success('IM????????????');
      }).catch(error => {
        console.error(error);
        message.error(JSON.stringify(error));
      }).finally(() => {
        hide();
      });
    }
  }, [imConfig?.imGroupId]);


  /**
   * ?????????????????????
   */
  useEffect(() => {
    const url = rtcInfo?.publishUrl;
    const streamID = urlQueryRef.current.roomId;
    if (enabled && url && examClient) {
      startMixStreamJob({
        streamID,
        url,
        width: 400,
        height: 400,
      }).then(() => {
        const camera = (examClient.registeredDevice.get('camera') as QNCamera);
        const screen = (examClient.registeredDevice.get('screen') as QNScreen);
        return Promise.all([
          updateMixStreamJob(streamID, [
            {
              trackID: camera.cameraVideoTrack?.trackID || '',
              x: 0,
              y: 0,
              width: 200,
              height: 200
            },
            {
              trackID: screen.screenVideoTrack?.trackID || '',
              x: 200,
              y: 0,
              width: 200,
              height: 200
            }
          ])
        ]);
      });
    }
  }, [enabled, examClient]);

  /**
   * ??????????????????+??????
   */
  useEffect(() => {
    const userPublished = async (userID: string, tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]) => {
      const cameraTrack = tracks.find(track => track.tag === 'camera');
      const microphoneTrack = tracks.find(track => track.tag === 'audio');
      await examClient.rtcClient.subscribe(tracks);
      microphoneTrack?.play(document.body);
      updateMixStreamJob(urlQueryRef.current.roomId, [
        {
          trackID: cameraTrack?.trackID || '',
          x: 100,
          y: 200,
          width: 200,
          height: 200
        }
      ]);
      const element = document.getElementById('mobile-camera');
      if (element && cameraTrack) {
        Modal.info({
          content: '??????????????????????????????????????????????????????',
          okText: '??????',
          onOk() {
            cameraTrack.play(element);
          }
        });
      }
    };
    examClient.rtcClient.on('user-published', userPublished);
    return () => {
      examClient.rtcClient.off('user-published', userPublished);
    };
  }, [examClient]);

  /**
   * im????????????
   */
  useEffect(() => {
    const listener = (msg: string) => {
      const signaling = JSON.parse(msg);
      if (isInvitationSignal(signaling)) {
        const isMsgToMe = signaling.data.receiver === userStore.state.userInfo?.accountId;
        if (isMsgToMe && signaling.action === 'invite_send') {
          Modal.confirm({
            title: '????????????????????????',
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
   * ?????????????????????????????????
   */
  useEffect(() => {
    setAnswer(
      questions.map((question) => ({
        questionId: question.questionId,
      })),
    );
  }, [questions]);

  /**
   * ???????????????
   */
  useEffect(() => {
    const remaining = examInfo?.endTime ?
      moment(examInfo?.endTime).diff(moment(), 'milliseconds') : 0;
    setTimeRemaining(remaining);
  }, [examInfo?.endTime]);

  /**
   * ????????????
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
   * ????????????
   */
  const onSubmitPaper = () => {
    commitExamPaperReport(urlQueryRef.current.examId);
    const hide = message.loading('??????????????????', 0);
    const answerList = answer.map((a) => ({
      questionId: a.questionId,
      textList: [a.value || ''],
    }));
    ExamApi.submitAnswer({
      examId: urlQueryRef.current.examId,
      answerList,
    })
      .then((res) => {
        if (res.result) return message.success('??????????????????');
        return message.error('??????????????????');
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
   * ????????????
   */
  const onExitExam = () => {
    quitAnswerQuestionsReport(urlQueryRef.current.examId);
    Modal.confirm({
      title: '??????',
      content: '?????????????????????????????????????????????????????????????????????????????????',
      cancelText: '??????',
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

  // ??????????????????, ????????????????????????
  const currentProgress = useMemo(
    () => answer.map((a) => a.value).filter((v) => v).length,
    [answer],
  );

  return (
    <div className={styles.container}>
      <div id="teacher-microphone"/>
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
            <span className={styles.cameraTip}>????????????</span>
          </div>
          <div id="mobile-camera" className={styles.mobileCamera}>
            <span className={styles.cameraTip}>??????????????????</span>
          </div>
          <ScheduleCard
            className={styles.examDetail}
            current={currentProgress}
            total={questions.length}
            timeRemaining={timeRemaining}
          />
          <SheetCard
            questionCount={questions.length}
            totalScore={totalScore || 0}
            answer={answer.map((answerItem) => !!answerItem.value?.length)}
          />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideHeader}>
            <div className={styles.banner} style={{ display: 'none' }}>
              <span>????????????: ??????????????????</span>
              <span>??????????????????????????????????????????</span>
            </div>
            <div className={styles.buttons}>
              <Button type="primary" className={styles.button} onClick={onSubmitPaper}>????????????</Button>
              <Button type="primary" className={styles.button} onClick={onExitExam}>????????????</Button>
            </div>
          </div>
          <div className={styles.question}>
            <div className={styles.topic}>
              {
                questions.map((question, index) => (
                  <SingleChoiceSubject
                    value={answer[index]?.value}
                    onChange={(event) => onChooseAnswer(index, event.target.value)}
                    title={`???${index + 1}???: ${question.desc}`}
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

      <TrackInfoPanel
        videoStatus={trackInfo?.videoStatus}
        audioStatus={trackInfo?.audioStatus}
        screenStatus={trackInfo?.screenStatus}
        style={{
          position: 'fixed',
          top: 'revert',
          left: 'revert',
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
};

export default StudentRoom;
