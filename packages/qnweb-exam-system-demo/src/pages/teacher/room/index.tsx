import React, {
  useContext,
  useEffect, useMemo, useRef, useState,
} from 'react';
import { Button, message, Modal, Pagination } from 'antd';
import {
  InviteSignaling, RtmManager, ScreenMicSeat,
} from 'qnweb-high-level-rtc';
import { useInterval, useMount, useUnmount } from 'ahooks';
import useQNIM from '@/hooks/useQNIM';
import useExamStudents from '@/hooks/useExamStudents';
import ExamStudentSeat, { mapExamStatusToText } from '@/components/exam-student-seat';
import ExamRoomInfo from '@/components/exam-room-info';
import useExamInfo from '@/hooks/useExamInfo';
import useMtTrackRoom from '@/hooks/useMtTrackRoom';
import useJoinMtTrackRoom from '@/hooks/useJoinMtTrackRoom';
import { IM_APPKEY } from '@/config';
import { getUrlQueryParams, isInvitationSignal, log } from '@/utils';
import styles from './index.module.scss';
import { userStoreContext } from '@/store/UserStore';
import { ExamEventLogMoreResult, ExamExamineesExamIdResult } from '@/api/types';
import ExamApi from '@/api/ExamApi';
import * as BaseRoomApi from '@/api/BaseRoomApi';

log.setPreTitle('[TeacherRoom]');

interface CheatingEvent {
  action: string;
  value: string;
}

/**
 * 异常情况
 * @param event
 */
const cheatingEventToText = (event: CheatingEvent): string => {
  const { action, value } = event;
  if (action === 'faceDetect' && +value > 1) return '出现非考生人员';
  if (action === 'authFaceCompare' && +value < 60) return '考生非本人';
  if (action === 'visibilitychange' && value === 'hidden') return '打开其他浏览器';
  return '正常';
};

/**
 * 作弊列表
 * @param list
 */
const transformCheatingList = (list: CheatingEvent[]) => [
  ...new Set(
    list.map(
      (item) => cheatingEventToText(item),
    ),
  ),
].filter((text) => text !== '正常');

const TeacherRoom = () => {
  const urlQueryRef = useRef({
    examId: getUrlQueryParams('examId') || '',
  });
  const userStore = useContext(userStoreContext);
  const { examInfo } = useExamInfo(urlQueryRef.current.examId);
  const {
    students, total: totalStudent, pagination, toggleList,
  } = useExamStudents();
  const [currentStudent, setCurrentStudent] = useState<ExamExamineesExamIdResult['list'][number]>();
  const { micSeats: mtTrackRoomMicSeats, room: mtTrackRoom } = useMtTrackRoom();
  const { joinRoom: joinMtTrackRoom, imConfig } = useJoinMtTrackRoom();
  const [isMtTrackRoomJoined, setIsMtTrackRoomJoined] = useState(false);
  const latestMobileSeat = useMemo(
    () => mtTrackRoomMicSeats.slice().reverse().find(
      (s) => s.userExtension?.userExtRoleType === 'mobile',
    ),
    [mtTrackRoomMicSeats],
  );
  const [exceptionType, setExceptionType] = useState<string>();
  const [pollCheatingInterval, setPollCheatingInterval] = useState<number>();
  const [cheatingList, setCheatingList] = useState<ExamEventLogMoreResult['list']>([]);
  const lastTimestampRef = useRef<number>();
  const { loginIM, imClient } = useQNIM(IM_APPKEY);
  const [voiceCallStatus, setVoiceCallStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');

  /**
   * im登录
   */
  useMount(() => {
    const hide = message.loading('im登录中');
    loginIM({
      account: userStore.state.imConfig?.imUsername || '',
      password: userStore.state.imConfig?.imPassword || '',
    }).then(() => {
      message.success('im登录成功');
    }).finally(() => {
      hide();
    });
  });

  /**
   * im消息监听
   */
  useEffect(() => {
    const listener = (msg: string) => {
      const signaling = JSON.parse(msg);
      if (isInvitationSignal(signaling) && signaling.action !== 'invite_send') {
        if (currentStudent?.userId === signaling.data.receiver) {
          if (signaling.action === 'invite_accept') {
            mtTrackRoom.enableMicrophone().then(() => {
              setVoiceCallStatus('connected');
            }).catch((err) => {
              message.error(err.message);
              setVoiceCallStatus('idle');
            });
          } else {
            message.info('对方拒绝通话');
            setVoiceCallStatus('idle');
          }
        }
      }
    };
    RtmManager.addRtmChannelListener(listener);
    return () => {
      RtmManager.removeRtmChannelListener(listener);
    };
  }, [currentStudent?.userId, imClient, mtTrackRoom]);

  /**
   * 学生列表数据
   */
  useMount(() => {
    toggleList({
      examId: urlQueryRef.current.examId,
    }).then(() => {
      setPollCheatingInterval(1000);
    });
  });

  /**
   * 作弊日志轮训
   */
  useInterval(() => {
    const lastTimestamp = lastTimestampRef.current || -1;
    ExamApi.pollCheating({
      examId: urlQueryRef.current.examId,
      lastTimestamp,
      userList: (students || []).map((s) => s.userId),
    }).then((result) => {
      lastTimestampRef.current = result.timestamp;
      setCheatingList((prev) => {
        const list = prev.concat(result.list);
        const mapUserIdToEventList = new Map<string, {
          action: string;
          value: string;
          timestamp: number;
        }[]>();
        list.forEach((lItem) => {
          const { userId } = lItem;
          const eventList = (mapUserIdToEventList.get(userId) || []).concat(lItem.eventList);
          const uniqueMap = new Map(eventList.map((event) => [event.action, event]));
          mapUserIdToEventList.set(userId, [...uniqueMap.values()]);
        });
        return Array.from(mapUserIdToEventList).map((item) => ({
          userId: item[0],
          eventList: item[1],
        }));
      });
    });
  }, pollCheatingInterval, {
    immediate: true,
  });

  /**
   * 监听学生屏幕采集麦位
   */
  useEffect(() => {
    if (mtTrackRoom) {
      mtTrackRoom.getScreenTrackTool().addScreenMicSeatListener({
        onScreenMicSeatAdd(seat: ScreenMicSeat) {
          log.log('onScreenMicSeatAdd', seat);
          if (seat.isScreenOpen) {
            mtTrackRoom.getScreenTrackTool().setUserScreenWindowView(
              seat.uid,
              'pc-screen',
            );
          }
        },
      });
    }
  }, [mtTrackRoom]);

  /**
   * 卸载
   */
  useUnmount(() => {
    if (isMtTrackRoomJoined && mtTrackRoom) {
      BaseRoomApi.baseLeaveRoomApi({
        roomId: currentStudent?.roomInfo.roomId || '',
      })
        .then(() => mtTrackRoom.leaveRoom());
    }
  });

  /**
   * pc端摄像头和麦克风预览
   */
  useEffect(() => {
    log.log('mtTrackRoomMicSeats', mtTrackRoomMicSeats);
    if (mtTrackRoom) {
      const roomStudents = mtTrackRoomMicSeats.filter(
        (seat) => !seat.isMySeat,
      );
      const pcStudent = roomStudents.find(
        (roomStudent) => roomStudent.userExtension?.userExtRoleType === 'pc',
      );
      if (pcStudent) {
        if (pcStudent.isOwnerOpenVideo) {
          mtTrackRoom.setUserCameraWindowView(
            pcStudent.uid,
            'pc-camera',
          );
        }
        if (pcStudent.isOwnerOpenAudio) {
          mtTrackRoom.setUserMicrophoneWindowView(
            pcStudent.uid,
            'pc-camera',
          );
        }
      }
    }
  }, [mtTrackRoomMicSeats, currentStudent, mtTrackRoom]);

  /**
   * h5端副摄像头预览
   */
  useEffect(() => {
    log.log('latestMobileSeat', latestMobileSeat);
    if (latestMobileSeat && mtTrackRoom && latestMobileSeat.isOwnerOpenVideo) {
      mtTrackRoom.setUserCameraWindowView(
        latestMobileSeat.uid,
        'mobile-camera',
      );
    }
  }, [latestMobileSeat, mtTrackRoom]);

  /**
   * 加入学生的房间
   * @param student
   */
  const joinStudentRoom = (student: ExamExamineesExamIdResult['list'][number]) => {
    const hide = message.loading(`正在加入${student.userName}的房间`, 0);
    return joinMtTrackRoom({
      roomId: student?.roomInfo.roomId,
      room: mtTrackRoom,
      imGroupId: `${userStore.state.imConfig?.imGroupId}`,
    })
      .then(() => {
        setIsMtTrackRoomJoined(true);
        message.success(`加入${student.userName}的房间成功`);
      })
      .finally(() => {
        hide();
      });
  };

  /**
   * 点击学生进入学生房间
   * @param student
   */
  const onClickStudent = (student: ExamExamineesExamIdResult['list'][number]) => {
    if (student.userId === currentStudent?.userId) return;
    if (isMtTrackRoomJoined) {
      BaseRoomApi.baseLeaveRoomApi({
        roomId: currentStudent?.roomInfo.roomId || '',
      })
        .then(() => mtTrackRoom?.leaveRoom())
        .then(() => joinStudentRoom(student))
        .then(() => {
          setCurrentStudent(student);
        });
    } else {
      joinStudentRoom(student).then(() => {
        setCurrentStudent(student);
      });
    }
  };

  /**
   * 异常情况筛选
   * @param value
   */
  const onExceptionTypeChange = (value: string) => {
    setExceptionType(value);
  };

  /**
   * 根据用户id获取作弊信息
   * @param userId
   */
  const getCheatingEventListByUserId = (userId: string) => cheatingList.find(
    (item) => item.userId === userId,
  )?.eventList || [];

  /**
   * 获取用户作弊文本信息
   * @param userId
   */
  const getCheatingText = (userId: string) => {
    const texts = transformCheatingList(
      getCheatingEventListByUserId(userId),
    );
    return texts?.length ? texts?.join('，') : '正常';
  };

  const sendMicConnectMsg = () => {
    // 发送连麦请求
    const signaling: InviteSignaling = {
      action: 'invite_send',
      data: {
        flag: '',
        msg: '',
        timeStamp: Date.now(),
        initiatorUid: userStore.state.userInfo?.accountId || '',
        receiver: currentStudent?.userId || '',
        channelId: '',
      },
    };
    const msg = JSON.stringify(signaling);
    return imClient.sendChannelMsg(
      msg,
      `${imConfig?.imGroupId}`,
      true,
    );
  };

  /**
   * 挂断语音通话
   */
  const sendMicHangupMsg = () => mtTrackRoom.disableMicrophone();

  const onMicrophoneRequest = () => {
    if (!currentStudent?.userId) {
      Modal.error({
        content: '请先加入学生房间',
      });
      return;
    }
    if (voiceCallStatus === 'idle') {
      sendMicConnectMsg().then(() => {
        setVoiceCallStatus('connecting');
      }).catch((error: unknown) => {
        setVoiceCallStatus('idle');
        Modal.error({
          title: '连接失败',
          content: JSON.stringify(error),
        });
      });
    }
    if (voiceCallStatus === 'connected') {
      sendMicHangupMsg().then(() => {
        setVoiceCallStatus('idle');
      }).catch((error: unknown) => {
        Modal.error({
          title: '挂断失败',
          content: JSON.stringify(error),
        });
      });
    }
  };

  /**
   * 语音通话状态
   */
  const renderVoiceCallText = () => {
    if (voiceCallStatus === 'idle') return '请求语音通话';
    if (voiceCallStatus === 'connecting') return '连接中';
    if (voiceCallStatus === 'connected') return '挂断';
    return '未知状态';
  };

  return (
    <div className={styles.room}>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <ExamRoomInfo
            className={styles.roomInfo}
            title={examInfo?.examName}
            startTime={examInfo?.startTime}
            endTime={examInfo?.endTime}
            duration={examInfo?.duration}
            studentCount={totalStudent}
            exceptionType={exceptionType}
            onExceptionTypeChange={onExceptionTypeChange}
          />
          <div className={styles.students}>
            {
              students?.map(
                (student) => (
                  !exceptionType || getCheatingText(student.userId).includes(exceptionType) ? (
                    <ExamStudentSeat
                      key={student.userId}
                      className={styles.seat}
                      username={student.userName}
                      onClick={() => onClickStudent(student)}
                      seatId={student.userId}
                      playUrl={student.rtcInfo.flvPlayUrl}
                      examStatus={student.examPaperStatus}
                      cheatingText={getCheatingText(student.userId)}
                    />
                  ) : null
                ),
              )
            }
          </div>
          <div className={styles.footer}>
            <Pagination
              total={totalStudent}
              current={pagination?.current}
              pageSize={pagination?.pageSize}
              onChange={(current) => toggleList({
                ...pagination,
                current,
                examId: urlQueryRef.current.examId,
              })}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.info}>
            <div className={styles.infoCtx}>
              <span className={styles.label}>考生姓名:</span>
              <span className={styles.ctx}>{currentStudent?.userName}</span>
            </div>
            <div className={styles.infoCtx}>
              <span className={styles.label}>考试状态:</span>
              <span className={styles.ctx}>
                {mapExamStatusToText.get(currentStudent?.examPaperStatus as number)}
              </span>
            </div>
            <div className={styles.infoCtx}>
              <span className={styles.label}>异常情况:</span>
              <span className={styles.ctx}>
                {getCheatingText(currentStudent?.userId || '')}
              </span>
            </div>
          </div>
          <Button
            loading={voiceCallStatus === 'connecting'}
            type="primary"
            style={{ marginBottom: 20 }}
            onClick={onMicrophoneRequest}
          >
            {renderVoiceCallText()}
          </Button>
          <div className={styles.videos}>
            <div className={styles.pcCamera} id="pc-camera">
              <span className={styles.placeholderText}>电脑摄像头实时画面</span>
            </div>
            <div className={styles.mobileCamera} id="mobile-camera">
              <span className={styles.placeholderText}>副摄像头实时画面</span>
            </div>
            <div className={styles.pcScreen} id="pc-screen">
              <span className={styles.placeholderText}>电脑实时画面</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRoom;
