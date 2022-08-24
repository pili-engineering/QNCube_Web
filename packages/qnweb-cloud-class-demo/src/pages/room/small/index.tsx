import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useInterval, useRequest, useUnmount } from 'ahooks';
import {
  ClientRoleType,
  LazyTrackRoomSeat,
  MicSeatListener,
  MutableTrackRoomSeat,
  ScreenMicSeat
} from 'qnweb-high-level-rtc';
import { message, Modal } from 'antd';

import {
  ChatroomPanel,
  ExitClassroomModal, IconFont,
  NetworkGrade,
  NetworkStat,
  RoomHeader,
  RTCPanel,
  RTCPanelProps,
  useQNWhiteBoard,
  WhiteBoardPanel,
  WorkBox,
} from '@/components';
import { useUserStore } from '@/store';
import { RoomApi } from '@/api';
import {
  useIMMessage,
  useLazyTrackRoom,
} from '../_hooks';

import { BaseRoomProps } from '..';

import styles from './index.module.scss';

enum IMMessageAction {
  /**
   * 聊天消息
   */
  Chat = 'pub_chat_text',
  /**
   * 主动踢人
   */
  RtcKickOutFromMicSeat = 'rtc_kickOutFromMicSeat',
  /**
   * 申请上麦
   */
  UpMicApply = 'up_mic_apply',
  /**
   * 允许上麦
   */
  UpMicAllow = 'up_mic_allow',
  /**
   * 拒绝上麦
   */
  UpMicRefuse = 'up_mic_refuse',
}

const log = (...args: unknown[]) => {
  console.log('SmallRoom', ...args);
};

export const SmallRoom: React.FC<BaseRoomProps> = (props) => {
  const {
    imClient,
    roomId, role, rtcInfo, roomInfo, imConfig, userExtension,
    userInfo
  } = props;
  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';
  const roomToken = rtcInfo?.roomToken;
  const history = useHistory();
  const { state } = useUserStore();

  const { lazyRoomClient: roomClient, mySeat, sortedSeats } = useLazyTrackRoom(roomId);
  // 白板
  const { whiteboard } = useQNWhiteBoard(roomToken);

  const [chatroomPanelVisible, setChatroomPanelVisible] = useState(false);
  const [chatMessageInputValue, setChatMessageInputValue] = useState('');
  const [exitClassroomModalVisible, setExitClassroomModalVisible] = useState(false);
  const [networkStat, setNetworkStat] = useState<NetworkStat>();
  const { chatMessages } = useIMMessage(imClient);
  const [renderedSeats, setRenderedSeats] = useState<RTCPanelProps['seats']>([]);
  const [screenMic, setScreenMic] = useState<ScreenMicSeat | null>(null);

  const imGroupId = `${imConfig?.imGroupId || ''}`;

  const { runAsync: syncMicSeats } = useRequest(() => {
    return RoomApi.baseGetRoomInfoApi({
      roomId
    }).then(result => {
      const mics = result.data?.mics || [];
      const seats = mics.map<LazyTrackRoomSeat>(micItem => {
        const seatJson = micItem.attrs?.find(
          attrItem => attrItem.key === 'seat'
        )?.value || '{}';
        return JSON.parse(seatJson);
      });
      roomClient?.userClientTypeSyncMicSeats(seats);
      log('syncMicSeats', seats);
    });
  }, {
    manual: true
  });

  /**
   * 加入房间
   */
  useEffect(() => {
    if (!roomClient) return;
    if (!userExtension) return;
    if (!roomToken) return;
    if (!imGroupId) return;
    if (!imClient) return;
    if (!imConfig) return;
    const hide = message.loading('加入房间中...', 0);
    imClient
      .connect({
        name: imConfig.imUsername || '',
        password: imConfig.imPassword || ''
      })
      .then(() => {
        return syncMicSeats();
      })
      .then(() => {
        return roomClient.joinRoom({
          roomToken,
          imGroupId,
        }, JSON.parse(userExtension));
      })
      .then(() => {
        roomClient.setClientRoleType(
          ClientRoleType.CLIENT_ROLE_BROADCASTER,
        );
        roomClient.sitDown();
        log('joinRoom success');
        message.success('加入房间成功');
      })
      .catch(error => {
        message.error(`加入房间失败: ${error.message}`);
      })
      .finally(() => {
        hide();
      });
    return () => {
      hide();
    };
  }, [imClient, imConfig, imGroupId, roomClient, roomToken, syncMicSeats, userExtension]);

  /**
   * 学生端监听屏幕共享麦位
   */
  useEffect(() => {
    if (!roomClient) return;
    if (!isStudent) return;
    const handler = {
      onScreenMicSeatAdd(seat: ScreenMicSeat) {
        setScreenMic(seat);
      },
      onScreenMicSeatRemove() {
        setScreenMic(null);
      }
    };
    roomClient.getScreenTrackTool().addScreenMicSeatListener(handler);
    return () => {
      roomClient.getScreenTrackTool().removeScreenMicSeatListener(handler);
    };
  }, [isStudent, roomClient]);

  useEffect(() => {
    if (!roomClient) return;
    if (!screenMic) return;
    roomClient.getScreenTrackTool().setUserScreenWindowView(screenMic.uid, 'screen-share');
  }, [screenMic, roomClient]);

  /**
   * 定时网络状态
   */
  useInterval(() => {
    if (!roomClient) return;
    const localCameraTrack = roomClient.localCameraTrack;
    if (!localCameraTrack) return;
    const stat = localCameraTrack.getStats()[0];
    if (stat) {
      setNetworkStat({
        rtt: stat.uplinkRTT,
        packetLossRate: stat.uplinkLostRate,
        networkGrade: roomClient.getRtcClient().getNetworkQuality() as unknown as NetworkGrade,
      });
      return;
    }
    setNetworkStat(undefined);
  }, 1000);

  /**
   * 卸载
   */
  useUnmount(() => {
    roomClient?.sitUpAsAudience();
    whiteboard?.leaveRoom();
    roomClient?.leaveRoom();
  });

  /**
   * IM
   * 发送消息
   */
  const onSubmit = () => {
    if (imClient && chatMessageInputValue) {
      const msg = JSON.stringify({
        action: IMMessageAction.Chat,
        data: {
          senderId: state.userInfo?.accountId,
          senderName: state.userInfo?.nickname,
          msgContent: chatMessageInputValue,
          avatar: state.userInfo?.avatar,
        },
      });
      imClient.sendChannelMsg(
        msg, imGroupId, true,
      ).then(() => {
        setChatMessageInputValue('');
      });
    }
  };

  /**
   * 开启屏幕共享
   */
  const onIconScreenShareClick = () => {
    if (!roomClient) return;
    return roomClient.getScreenTrackTool().enableScreen();
  };

  /**
   * 禁用指定用户的麦克风
   * @param userId
   * @param muted
   */
  const disableUserMic = (userId: string, muted: boolean) => {
    if (!roomClient) return;
    return roomClient.forbiddenMicSeatAudio(userId, muted, 'disableUserMic');
  };
  /**
   * 禁用指定用户的摄像头
   * @param userId
   * @param muted
   */
  const disableUserCamera = (userId: string, muted: boolean) => {
    if (!roomClient) return;
    return roomClient.forbiddenMicSeatVideo(userId, muted, 'disableUserCamera');
  };
  /**
   * 踢人
   * @param userId
   */
  const kickUser = (userId: string) => {
    if (!imClient) return;
    const msg = JSON.stringify({
      action: IMMessageAction.RtcKickOutFromMicSeat,
      data: sortedSeats.find(seat => seat.uid === userId) || {},
    });
    imClient.sendChannelMsg(
      msg, imGroupId, true,
    );
  };

  /**
   * 接收被踢下麦的im消息
   */
  useEffect(() => {
    if (!imClient) return;
    if (!mySeat) return;
    if (!roomClient) return;
    const handler = (msg: string) => {
      const obj = JSON.parse(msg);
      if (
        obj.action === IMMessageAction.RtcKickOutFromMicSeat &&
        obj.data.uid === mySeat.uid
      ) {
        roomClient.sitUpAsAudience();
        message.info('你已被踢下麦');
      }
    };
    imClient.addRtmChannelListener(handler);
    return () => {
      imClient.removeRtmChannelListener(handler);
    };
  }, [imClient, mySeat, roomClient]);

  const disableUserMicFnRef = useRef<typeof disableUserMic | null>(null);
  const disableUserCameraFnRef = useRef<typeof disableUserCamera | null>(null);
  const kickUserFnRef = useRef<typeof kickUser | null>(null);

  useEffect(() => {
    disableUserMicFnRef.current = disableUserMic;
    disableUserCameraFnRef.current = disableUserCamera;
    kickUserFnRef.current = kickUser;
  });

  /**
   * 渲染麦位
   */
  useEffect(() => {
    const seats = sortedSeats
      .map<RTCPanelProps['seats'][number]>((item) => {
        return {
          popoverVisible: isTeacher && item.role === 'student',
          isCameraOpen: item.isOwnerOpenVideo,
          isMicOpen: item.isOwnerOpenAudio,
          username: item.username,
          userId: item.uid,
          isMicDisabled: item.isForbiddenAudioByManager,
          isCameraDisabled: item.isForbiddenVideoByManager,
          onMicDisabledChanged: (muted) => disableUserMicFnRef.current?.(item.uid, muted),
          onCameraDisabledChanged: (muted) => disableUserCameraFnRef.current?.(item.uid, muted),
          onKickClick: () => kickUserFnRef.current?.(item.uid),
        };
      });
    setRenderedSeats(seats);
  }, [isTeacher, setRenderedSeats, sortedSeats]);

  /**
   * 麦克风/摄像头被禁用逻辑处理
   */
  useEffect(() => {
    if (!roomClient) return;
    const listener: MicSeatListener<MutableTrackRoomSeat> = {
      onAudioForbiddenStatusChanged(seat: MutableTrackRoomSeat) {
        if (seat.isMySeat) {
          roomClient.muteLocalMicrophone(seat.isForbiddenAudioByManager || false);
          if (seat.isForbiddenAudioByManager) {
            message.error('您的麦克风已被老师禁用');
          } else {
            message.success('您的麦克风已被老师取消禁用');
          }
        }
      },
      onVideoForbiddenStatusChanged(seat: MutableTrackRoomSeat) {
        if (seat.isMySeat) {
          roomClient.muteLocalCamera(seat.isForbiddenVideoByManager || false);
          if (seat.isForbiddenVideoByManager) {
            message.error('您的摄像头已被老师禁用');
          } else {
            message.success('您的摄像头已被老师取消禁用');
          }
        }
      },
    };
    roomClient.addMicSeatListener(listener);
    return () => {
      roomClient.removeMicSeatListener(listener);
    };
  }, [roomClient]);

  /**
   * 举手，申请上麦
   */
  const onRaiseHandClick = () => {
    if (!imClient) return;
    if (!userInfo) return;
    const msg = JSON.stringify({
      action: IMMessageAction.UpMicApply,
      data: {
        uid: userInfo.userId,
        username: userInfo.nickname,
      }
    });
    imClient.sendChannelMsg(
      msg, imGroupId, true,
    );
  };

  /**
   * 老师监听用户申请上麦im消息
   */
  useEffect(() => {
    if (!imClient) return;
    if (!roomClient) return;
    if (!isTeacher) return;
    const handler = (msg: string) => {
      const obj = JSON.parse(msg);
      if (obj.action === IMMessageAction.UpMicApply) {
        Modal.confirm({
          title: '用户上麦申请',
          content: `${obj.data.username}申请上麦`,
          okText: '同意',
          cancelText: '拒绝',
          onCancel() {
            const msg = JSON.stringify({
              action: IMMessageAction.UpMicRefuse,
              data: obj.data
            });
            imClient.sendChannelMsg(
              msg, imGroupId, true,
            );
          },
          onOk() {
            const msg = JSON.stringify({
              action: IMMessageAction.UpMicAllow,
              data: obj.data
            });
            imClient.sendChannelMsg(
              msg, imGroupId, true,
            );
          }
        });
      }
    };
    imClient.addRtmChannelListener(handler);
    return () => {
      imClient.removeRtmChannelListener(handler);
    };
  }, [imClient, imGroupId, isTeacher, roomClient]);

  /**
   * 监听老师同意用户上麦
   * 监听老师拒绝上麦申请
   */
  useEffect(() => {
    if (!imClient) return;
    if (!roomClient) return;
    const handler = (msg: string) => {
      const obj = JSON.parse(msg);
      if (userInfo?.userId !== obj.data.uid) return;
      if (obj.action === IMMessageAction.UpMicAllow) {
        message.success('老师同意了你的上麦申请');
        roomClient.sitDown();
      }
      if (obj.action === IMMessageAction.UpMicRefuse) {
        message.error('老师拒绝了你的上麦申请');
      }
    };
    imClient.addRtmChannelListener(handler);
    return () => {
      imClient.removeRtmChannelListener(handler);
    };
  }, [imClient, roomClient, userInfo?.userId]);

  return (
    <div className={styles.room}>
      <RoomHeader
        title={roomInfo?.title}
        onClose={() => setExitClassroomModalVisible(true)}
        roomId={roomId}
        style={{ border: '1px solid #ececf1' }}
        networkStat={networkStat}
      />
      <div className={styles.roomBody}>
        {
          isTeacher && <WorkBox
            className={styles.workBox}
            onIconScreenShareClick={onIconScreenShareClick}
          />
        }
        {
          isStudent && <IconFont
            type="icon-jushou"
            className={styles.iconRaiseHand}
            onClick={onRaiseHandClick}
          />
        }
        <div
          id="screen-share"
          className={styles.roomBodyWhiteBoard}
          style={{
            display: screenMic ? 'block' : 'none',
          }}
        />
        <WhiteBoardPanel
          className={styles.roomBodyWhiteBoard}
          style={{
            display: screenMic ? 'none' : 'block',
          }}
          toolbarProps={{
            direction: 'vertical',
            fixed: 'right',
            fixedClassName: styles.WhiteBoardPanelToolbarFixed,
            className: styles.WhiteBoardPanelToolbar,
          }}
          toolbarVisible={isTeacher}
          tabsVisible={isTeacher}
          locked={isStudent}
        />
        <div className={styles.roomBodyRight}>
          <RTCPanel
            className={styles.roomBodyRTC}
            seats={renderedSeats}
            toolVisible={true}
            chatIconVisible={true}
            mainSeatCount={1}
            onChatVisibleChanged={() => setChatroomPanelVisible(!chatroomPanelVisible)}
            isMicOpen={mySeat?.isOwnerOpenAudio}
            isCameraOpen={mySeat?.isOwnerOpenVideo}
            onMicChanged={() => {
              if (!roomClient) return;
              if (!mySeat) return;
              const isMicDisabled = Boolean(mySeat.isForbiddenAudioByManager);
              if (isMicDisabled) {
                message.error('您的麦克风已被老师禁用');
                return;
              }
              roomClient.muteLocalMicrophone(
                Boolean(mySeat?.isOwnerOpenAudio)
              );
            }}
            onCameraChanged={() => {
              if (!roomClient) return;
              if (!mySeat) return;
              const isCameraDisabled = mySeat.isForbiddenAudioByManager;
              if (isCameraDisabled) {
                message.error('您的摄像头已被老师禁用');
                return;
              }
              roomClient.muteLocalCamera(
                Boolean(mySeat?.isOwnerOpenVideo)
              );
            }}
          />
          <ChatroomPanel
            className={classNames(styles.roomBodyChat, styles.roomBodyChatFloat, {
              [styles.roomBodyChatFloatVisible]: chatroomPanelVisible,
            })}
            inputValue={chatMessageInputValue}
            onInputValueChange={(event) => setChatMessageInputValue(event.target.value)}
            onSubmit={onSubmit}
            messages={chatMessages}
          />
        </div>
      </div>
      <ExitClassroomModal
        visible={exitClassroomModalVisible}
        onCancel={() => setExitClassroomModalVisible(false)}
        onOk={() => {
          history.goBack();
        }}
      />
    </div>
  );
};
