import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInterval, useUnmount } from 'ahooks';
import {
  ClientRoleType,
  MicSeatListener,
  MutableTrackRoomSeat,
  ScreenMicSeat
} from 'qnweb-high-level-rtc';
import { message } from 'antd';

import {
  ChatroomPanel,
  ExitClassroomModal,
  NetworkGrade,
  NetworkStat,
  RoomHeader,
  RTCPanel, RTCPanelProps,
  useQNWhiteBoard,
  WhiteBoardPanel,
  WorkBox,
} from '@/components';
import { useUserStore } from '@/store';
import {
  useMutableTrackRoom,
  useIMMessage
} from '../_hooks';

import { BaseRoomProps } from '..';

import styles from './index.module.scss';

export const OneToOneRoom: React.FC<BaseRoomProps> = (props) => {
  const {
    imClient,
    roomId, role, rtcInfo, roomInfo, imConfig, userExtension
  } = props;
  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';
  const history = useHistory();
  const { state } = useUserStore();

  const { mtRoomClient: roomClient, sortedSeats, mySeat } = useMutableTrackRoom();
  // 白板
  const { whiteboard } = useQNWhiteBoard(rtcInfo?.roomToken);

  const [chatroomPanelVisible, setChatroomPanelVisible] = useState(false);
  const [chatMessageInputValue, setChatMessageInputValue] = useState('');
  const [exitClassroomModalVisible, setExitClassroomModalVisible] = useState(false);
  const [networkStat, setNetworkStat] = useState<NetworkStat>();
  const { chatMessages } = useIMMessage(imClient);
  const [renderedSeats, setRenderedSeats] = useState<RTCPanelProps['seats']>([]);
  const [screenMic, setScreenMic] = useState<ScreenMicSeat | null>(null);

  const imGroupId = `${imConfig?.imGroupId || ''}`;

  /**
   * 加入房间
   */
  useEffect(() => {
    const roomToken = rtcInfo?.roomToken;
    if (!roomClient) return;
    if (!userExtension) return;
    if (!roomToken) return;
    if (!imGroupId) return;
    if (!imClient) return;
    if (!imConfig) return;
    const hide = message.loading('加入房间中...', 0);
    roomClient.setClientRoleType(
      ClientRoleType.CLIENT_ROLE_BROADCASTER,
    );
    imClient.connect({
      name: imConfig.imUsername || '',
      password: imConfig.imPassword || ''
    }).then(() => {
      return roomClient.joinRoom({
        roomToken,
        imGroupId,
      }, JSON.parse(userExtension));
    }).then(() => {
      roomClient.enableCamera();
      roomClient.enableMicrophone();
      message.success('加入房间成功');
    }).catch(error => {
      console.error(JSON.stringify(error));
      message.error('加入房间失败');
    }).finally(() => {
      hide();
    });
    return () => {
      hide();
    };
  }, [imClient, imConfig, imGroupId, roomClient, rtcInfo?.roomToken, userExtension]);

  /**
   * 监听屏幕共享麦位
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
        action: 'pub_chat_text',
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

  const disableUserMicFnRef = useRef<typeof disableUserMic | null>(null);
  const disableUserCameraFnRef = useRef<typeof disableUserCamera | null>(null);

  useEffect(() => {
    disableUserMicFnRef.current = disableUserMic;
    disableUserCameraFnRef.current = disableUserCamera;
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
            chatIconVisible={false}
            mainSeatCount={2}
            onChatVisibleChanged={() => setChatroomPanelVisible(!chatroomPanelVisible)}
            isMicOpen={mySeat?.isOwnerOpenAudio}
            isCameraOpen={mySeat?.isOwnerOpenVideo}
            onMicChanged={() => {
              if (!roomClient) return;
              if (!mySeat) return;
              const isMicDisabled = Boolean(mySeat?.isForbiddenAudioByManager);
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
              const isCameraDisabled = mySeat?.isForbiddenAudioByManager;
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
            className={styles.roomBodyChat}
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
