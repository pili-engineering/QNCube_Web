import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import {
  ChatroomPanel,
  ExitClassroomModal,
  NetworkStat,
  RoomHeader,
  RTCPanel,
  useQNWhiteBoard,
  WhiteBoardPanel,
  useQNIM, NetworkGrade,
} from '../../components';
import {
  baseLeaveRoomApi,
} from '../../api';
import styles from './index.module.scss';
import {
  useBaseRoomHeartbeat, useInterval, useUnmount,
  useToast,
} from '../../hooks';
import useInitBaseConfig from './useInitBaseConfig';
import useInitCameraAndMicrophone from './useInitCameraAndMicrophone';
import useIMMessage from './useIMMessage';
import useRenderMicSeat from './useRenderMicSeat';
import useMutableTrackRoom from './useMutableTrackRoom';

const Room = () => {
  const history = useHistory();
  const {
    baseRoomJoined, roomToken, roomId, role, userExtension,
    imConfig, classType, baseRoomInfo, stateUserInfo,
  } = useInitBaseConfig();
  const [chatroomPanelVisible, setChatroomPanelVisible] = useState(false);
  const [exitClassroomModalVisible, setExitClassroomModalVisible] = useState(false);
  const { setIsEnabled } = useBaseRoomHeartbeat({
    roomId
  }); // 心跳

  useEffect(() => {
    setIsEnabled(baseRoomJoined)
  }, [baseRoomJoined])

  /**
   * IM
   */
  const [chatMessageInputValue, setChatMessageInputValue] = useState('');
  const { adapter, joinState: imJoinState, chatRoomId } = useQNIM(imConfig);
  useToast(imJoinState, 'IM');

  const { mtRoom, joinState: rtcJoinState, seats: rtcSeats } = useMutableTrackRoom({
    roomToken,
    imGroupId: imConfig?.chatRoomId,
  }, userExtension || '', imJoinState);

  /**
   * 初始化摄像头和麦克风
   */
  const {
    isMicOpen, isCameraOpen,
    toggleCamera, toggleMic,
  } = useInitCameraAndMicrophone(mtRoom, rtcJoinState);
  /**
   * 白板
   */
  const { whiteboard, joinState: whiteBoardJoinState } = useQNWhiteBoard(roomToken);
  useToast(whiteBoardJoinState, 'WhiteBoard');

  /**
   * 卸载
   */
  useUnmount(() => {
    whiteboard?.leaveRoom();
    mtRoom?.leaveRoom();
    if (chatRoomId) adapter?.leaveChannel(chatRoomId);
    return baseLeaveRoomApi({
      roomId,
    });
  });

  /**
   * 监听 IM 消息
   */
  const { messages } = useIMMessage(adapter, stateUserInfo);

  /**
   * 渲染麦位
   */
  const { seats } = useRenderMicSeat(mtRoom, rtcJoinState, rtcSeats, stateUserInfo);

  /**
   * IM
   * 发送消息
   */
  const onSubmit = () => {
    if (adapter && chatMessageInputValue) {
      const msg = JSON.stringify({
        action: 'pub_chat_text',
        data: {
          senderId: stateUserInfo?.accountId,
          senderName: stateUserInfo?.nickname,
          msgContent: chatMessageInputValue,
          avatar: stateUserInfo?.avatar,
        },
      });
      adapter.sendChannelMsg(
        msg, imConfig?.chatRoomId || '', true,
      ).then(() => {
        setChatMessageInputValue('');
      });
    }
  };

  /**
   * 定时刷新网络状态
   */
  const [networkStat, setNetworkStat] = useState<NetworkStat>();
  useInterval(() => {
    if (mtRoom && rtcJoinState === 'joined' && stateUserInfo) {
      const stat = mtRoom.localCameraTrack?.getStats()[0];
      setNetworkStat({
        rtt: stat?.uplinkRTT,
        packetLossRate: stat?.uplinkLostRate,
        networkGrade: mtRoom.getRtcClient().getNetworkQuality() as unknown as NetworkGrade,
      });
    }
  }, 1000);

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
        <WhiteBoardPanel
          className={styles.roomBodyWhiteBoard}
          toolbarProps={{
            direction: 'vertical',
            fixed: 'right',
            fixedClassName: styles.WhiteBoardPanelToolbarFixed,
            className: styles.WhiteBoardPanelToolbar,
          }}
          toolbarVisible={role === 'teacher'}
          tabsVisible={role === 'teacher'}
          locked={role !== 'teacher'}
        />
        <div className={styles.roomBodyRight}>
          <RTCPanel
            className={styles.roomBodyRTC}
            seats={seats}
            barVisible
            chatIconVisible={classType === 1}
            mainSeatCount={classType === 1 && role === 'teacher' ? 1 : 2}
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
              [styles.roomBodyChatFloat]: classType === 1,
              [styles.roomBodyChatFloatVisible]: chatroomPanelVisible && classType === 1,
            })}
            inputValue={chatMessageInputValue}
            onInputValueChange={(event) => setChatMessageInputValue(event.target.value)}
            onSubmit={onSubmit}
            messages={messages}
          />
        </div>
      </div>
      <ExitClassroomModal
        visible={exitClassroomModalVisible}
        onCancel={() => setExitClassroomModalVisible(false)}
        onOk={() => {
          history.push('/home');
        }}
      />
    </div>
  );
};

export default Room;
