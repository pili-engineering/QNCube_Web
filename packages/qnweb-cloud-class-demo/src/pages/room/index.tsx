import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useInterval, useUnmount } from 'ahooks';
import { ClientRoleType, QNRTMAdapter, RtmManager, ScreenMicSeat } from 'qnweb-high-level-rtc';
import { message } from 'antd';

import {
  ChatroomPanel,
  ExitClassroomModal,
  NetworkGrade,
  NetworkStat,
  RoomHeader,
  RTCPanel,
  useQNWhiteBoard,
  WhiteBoardPanel,
  WorkBox,
} from '@/components';
import { useBaseRoomHeartbeat, } from '@/hooks';
import { RoomApi } from '@/api';

import useInitBaseConfig from './useInitBaseConfig';
import useInitCameraAndMicrophone from './useInitCameraAndMicrophone';
import useIMMessage from './useIMMessage';
import useRenderMicSeat from './useRenderMicSeat';
import useMutableTrackRoom from './useMutableTrackRoom';

import styles from './index.module.scss';

const Room: React.FC = () => {
  const history = useHistory();

  const {
    baseRoomJoined, roomToken, roomId, role, userExtension,
    imConfig, classType, baseRoomInfo, stateUserInfo,
  } = useInitBaseConfig();
  // 心跳
  const { setIsEnabled } = useBaseRoomHeartbeat({
    roomId
  });
  const { mtRoom, seats: rtcSeats } = useMutableTrackRoom();
  // 白板
  const { whiteboard } = useQNWhiteBoard(roomToken);

  const [chatroomPanelVisible, setChatroomPanelVisible] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [imClient, setIMClient] = useState<QNRTMAdapter | null>(null);
  const [chatMessageInputValue, setChatMessageInputValue] = useState('');
  const [exitClassroomModalVisible, setExitClassroomModalVisible] = useState(false);
  const [networkStat, setNetworkStat] = useState<NetworkStat>();
  const { chatMessages } = useIMMessage(imClient);
  const { seats } = useRenderMicSeat(mtRoom, isJoined, rtcSeats, stateUserInfo);
  const {
    isMicOpen, isCameraOpen,
    toggleCamera, toggleMic,
  } = useInitCameraAndMicrophone(mtRoom, isJoined);
  const [screenMic, setScreenMic] = useState<ScreenMicSeat | null>(null);

  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';
  const isSmallClass = classType === 1;
  // const isOneToOneClass = classType === 2;

  /**
   * 实例化imClient
   */
  useEffect(() => {
    const appKey = imConfig?.appKey;
    if (!appKey) return;
    const imAdapter = RtmManager.setRtmAdapter(
      new QNRTMAdapter(appKey),
    ).getRtmAdapter<QNRTMAdapter>();
    setIMClient(imAdapter);
  }, [imConfig]);

  /**
   * 加入房间
   */
  useEffect(() => {
    const imGroupId = imConfig?.chatRoomId;
    if (!mtRoom) return;
    if (!userExtension) return;
    if (!roomToken) return;
    if (!imGroupId) return;
    if (!imClient) return;
    if (!imConfig) return;
    const hide = message.loading('加入房间中...', 0);
    mtRoom.setClientRoleType(
      ClientRoleType.CLIENT_ROLE_BROADCASTER,
    );
    imClient.connect({
      name: imConfig.loginAccount?.name || '',
      password: imConfig?.loginAccount?.password || ''
    }).then(() => {
      return mtRoom.joinRoom({
        roomToken,
        imGroupId
      }, JSON.parse(userExtension));
    }).then(() => {
      message.success('加入房间成功');
      setIsJoined(true);
    }).catch(error => {
      console.error(JSON.stringify(error));
      message.error('加入房间失败');
    }).finally(() => {
      hide();
    });
    return () => {
      hide();
    };
  }, [mtRoom, userExtension, roomToken, imConfig, imClient]);

  /**
   * 监听屏幕共享麦位
   */
  useEffect(() => {
    if (!mtRoom) return;
    const handler = {
      onScreenMicSeatAdd(seat: ScreenMicSeat) {
        if (isStudent) {
          setScreenMic(seat);
        }
      },
      onScreenMicSeatRemove() {
        if (isStudent) {
          setScreenMic(null);
        }
      }
    };
    mtRoom.getScreenTrackTool().addScreenMicSeatListener(handler);
    return () => {
      mtRoom.getScreenTrackTool().removeScreenMicSeatListener(handler);
    };
  }, [isStudent, mtRoom]);

  useEffect(() => {
    if (!mtRoom) return;
    if (!screenMic) return;
    mtRoom.getScreenTrackTool().setUserScreenWindowView(screenMic.uid, 'screen-share');
  }, [screenMic, mtRoom]);

  /**
   * 定时网络状态
   */
  useInterval(() => {
    if (mtRoom && isJoined) {
      const stat = mtRoom.localCameraTrack?.getStats()[0];
      setNetworkStat({
        rtt: stat?.uplinkRTT,
        packetLossRate: stat?.uplinkLostRate,
        networkGrade: mtRoom.getRtcClient().getNetworkQuality() as unknown as NetworkGrade,
      });
    }
  }, 1000);

  /**
   * 开启心跳
   */
  useEffect(() => {
    setIsEnabled(baseRoomJoined);
  }, [baseRoomJoined, setIsEnabled]);

  /**
   * 卸载
   */
  useUnmount(() => {
    whiteboard?.leaveRoom();
    mtRoom?.leaveRoom();
    RoomApi.baseLeaveRoomApi({
      roomId,
    });
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
          senderId: stateUserInfo?.accountId,
          senderName: stateUserInfo?.nickname,
          msgContent: chatMessageInputValue,
          avatar: stateUserInfo?.avatar,
        },
      });
      imClient.sendChannelMsg(
        msg, imConfig?.chatRoomId || '', true,
      ).then(() => {
        setChatMessageInputValue('');
      });
    }
  };

  /**
   * 开启屏幕共享
   */
  const onIconScreenShareClick = () => {
    if (!mtRoom) return;
    return mtRoom.getScreenTrackTool().enableScreen();
  };

  return (
    <div className={styles.room}>
      <RoomHeader
        title={baseRoomInfo?.title}
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
            seats={seats}
            barVisible
            chatIconVisible={isSmallClass}
            mainSeatCount={isSmallClass && isTeacher ? 1 : 2}
            onToggleChatPanel={() => setChatroomPanelVisible(!chatroomPanelVisible)}
            isMicOpen={isMicOpen}
            isCameraOpen={isCameraOpen}
            onToggleCamera={() => {
              mtRoom?.muteLocalCamera(isCameraOpen);
              toggleCamera(!isCameraOpen);
            }}
            onToggleMic={() => {
              mtRoom?.muteLocalMicrophone(isMicOpen);
              toggleMic(!isMicOpen);
            }}
          />
          <ChatroomPanel
            className={classNames(styles.roomBodyChat, {
              [styles.roomBodyChatFloat]: isSmallClass,
              [styles.roomBodyChatFloatVisible]: chatroomPanelVisible && isSmallClass,
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

export default Room;
