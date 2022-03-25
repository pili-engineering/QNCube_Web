import React, {
  useContext,
  useEffect, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { BaseMessageJson, RtmManager } from 'qnweb-high-level-rtc';
import { message } from 'antd';
import RTCRoom from './components/RTCRoom';
import IMChatInput from './components/IMChatInput';
import IMRoom from './components/IMRoom';
import { BaseIcon } from '../../components';
import IconScreenShare from '../../static/images/icon-share.svg';
import IconMicOn from '../../static/images/icon-microphone-on.svg';
import IconMicOff from '../../static/images/icon-microphone-off.svg';
import IconCameraOn from '../../static/images/icon-video-on.svg';
import IconCameraOff from '../../static/images/icon-video-off.svg';
import IconHangUp from '../../static/images/icon-hangup.svg';
import IconScreenBack from '../../static/images/icon-screen.svg';
import IconScreenFont from '../../static/images/icon-screen-2.svg';
import {
  useRepairJoinRoom, useMutableRoomInit, useRoomEntity,
  useWhiteBoardInitialize, useRtmp, useUnmount, useQNIM,
  QNIMConfig,
} from '../../hooks';
import { repairLeaveRoomApi, Role } from '../../api';
import styles from './index.module.scss';
import { getUrlParam } from '../../utils';
import WhiteBoardToolBar from './components/WhiteBoardToolBar';
import { StoreContext } from '../../store';
import IMMessageList from './components/IMMessageList';

export enum StreamType {
  Rtmp = 'rtmp',
  Rtc = 'rtc'
}

const Room = () => {
  const history = useHistory();
  const params = useParams<{ roomId: string }>();
  const { state } = useContext(StoreContext);
  const { roomId } = useParams<{ roomId: string }>();
  const [inputVal, setInputVal] = useState('');
  const [screenShare, setScreenShare] = useState(false);
  const streamType = getUrlParam<StreamType>('streamType');
  const role = getUrlParam<Role>('role');
  const { repairRoomJoined, repairJoinRoomRes } = useRepairJoinRoom(roomId, role);
  const [roomEntity] = useRoomEntity(repairJoinRoomRes);
  const { documentChanged } = useWhiteBoardInitialize(roomEntity);
  const [roomCoverVisible, setRoomCoverVisible] = useState<boolean>(false);
  const [qnImConfig, setQnImConfig] = useState<QNIMConfig>();
  const { adapter, joinState } = useQNIM(qnImConfig);
  const [messages, setMessages] = useState<BaseMessageJson[]>([]);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const {
    mtRoomJoined, mtRoom, seats,
  } = useMutableRoomInit(repairRoomJoined && joinState === 'joined', roomEntity);

  /**
   * 设置im消息监听
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const channelMessageHandler = (receivedMessage: string) => {
      const json: BaseMessageJson = JSON.parse(receivedMessage);
      setMessages((prevMessages) => prevMessages.concat(json));
    };
    if (adapter) {
      RtmManager.addRtmChannelListener(channelMessageHandler);
      return () => {
        RtmManager.removeRtmChannelListener(channelMessageHandler);
      };
    }
  }, [adapter, state.userInfo?.accountId]);

  useEffect(() => {
    if (joinState === 'joined') {
      const msg = JSON.stringify({
        action: 'welcome',
        data: {
          senderId: state.userInfo?.accountId,
          senderName: state.userInfo?.nickname,
          msgContent: '进入了房间',
          avatar: state.userInfo?.avatar,
          timestamp: Date.now(),
        },
      });
      adapter?.sendChannelMsg(
        msg, qnImConfig?.chatRoomId || '', true,
      );
    }
  }, [
    adapter, joinState, qnImConfig?.chatRoomId,
    state.userInfo?.accountId, state.userInfo?.avatar,
    state.userInfo?.nickname,
  ]);

  /**
   * 设置im配置
   */
  useEffect(() => {
    if (repairJoinRoomRes) {
      setQnImConfig({
        appKey: 'cigzypnhoyno',
        loginAccount: {
          name: state.imConfig?.imUsername,
          password: state.imConfig?.imPassword,
        },
        chatRoomId: `${repairJoinRoomRes.imConfig?.imGroupId}`,
      });
    }
  }, [repairJoinRoomRes, state.imConfig?.imPassword, state.imConfig?.imUsername]);

  useRtmp(repairJoinRoomRes?.rtcInfo?.flvPlayUrl);

  /**
   * 展示封面
   */
  useEffect(() => {
    if (streamType === StreamType.Rtc) {
      const staffSeat = seats.find((seat) => {
        const { userExtRoleType } = seat.userExtension || {};
        return userExtRoleType === Role.Staff;
      });
      setRoomCoverVisible(!staffSeat?.isOwnerOpenVideo);
    }
  }, [seats, streamType]);

  /**
   * 房间清除
   */
  useUnmount(() => {
    message.destroy('rtc');
    message.destroy('im');
    message.destroy('whiteboard');
    const msg = JSON.stringify({
      action: 'quit_room',
      data: {
        senderId: state.userInfo?.accountId,
        senderName: state.userInfo?.nickname,
        msgContent: '离开了房间',
        avatar: state.userInfo?.avatar,
        timestamp: Date.now(),
      },
    });
    adapter?.sendChannelMsg(
      msg, qnImConfig?.chatRoomId || '', true,
    );
    if (streamType === StreamType.Rtc) {
      mtRoom?.leaveRoom().then(() => {
        console.log('离开rtc房间');
      });
    }
    state.whiteBoard.leaveRoom();
    // if (qnImConfig?.chatRoomId) adapter?.leaveChannel(qnImConfig?.chatRoomId);
    repairLeaveRoomApi(params.roomId);
  });

  const leaveRoom = async () => {
    history.push('/room-list');
  };

  /**
   * 初始化开启音频模块
   */
  useEffect(() => {
    if (mtRoom && mtRoomJoined && streamType === StreamType.Rtc) {
      mtRoom.enableMicrophone().then(() => {
        setMic(true);
      });
    }
  }, [mtRoom, mtRoomJoined, streamType]);

  /**
   * im 发送消息
   */
  const onSubmit = () => {
    const msg = JSON.stringify({
      action: 'pub_chat_text',
      data: {
        senderId: state.userInfo?.accountId,
        senderName: state.userInfo?.nickname,
        msgContent: inputVal,
        avatar: state.userInfo?.avatar,
        timestamp: Date.now(),
      },
    });
    adapter?.sendChannelMsg(
      msg, qnImConfig?.chatRoomId || '', true,
    ).then(() => {
      setInputVal('');
    });
  };

  return (
    <div className={styles.room}>
      <div className={styles.container}>
        <RTCRoom
          className={styles.RTCModule}
          title={repairJoinRoomRes?.roomInfo?.title || ''}
          footer={[
            <div className={styles.RTCModuleFooter}>
              <div className={styles.deviceTools}>
                <BaseIcon
                  className={styles.deviceButton}
                  src={mic ? IconMicOn : IconMicOff}
                  onClick={() => {
                    mtRoom?.muteLocalMicrophone(mic);
                    setMic(!mic);
                  }}
                  style={{ display: role === Role.Student ? 'none' : 'block' }}
                />
                <BaseIcon
                  className={styles.deviceButton}
                  src={IconHangUp}
                  onClick={leaveRoom}
                />
                <BaseIcon
                  className={styles.deviceButton}
                  src={camera ? IconCameraOn : IconCameraOff}
                  onClick={() => {
                    mtRoom?.muteLocalMicrophone(camera);
                    setCamera(!camera);
                  }}
                  style={{ display: 'none' }}
                />
              </div>
              <BaseIcon style={{ display: 'none' }} src={IconScreenShare} text="屏幕共享" />
            </div>,
          ]}
        >
          <div
            className={styles.RTCModuleBody}
            style={{ backgroundImage: `url(${roomCoverVisible ? repairJoinRoomRes?.roomInfo?.image : ''})` }}
            id="rtcModuleBody"
          >
            {
              seats.map((seat) => {
                const { userExtRoleType } = seat.userExtension || {};
                const elementId = `${userExtRoleType}-${seat.uid}`;
                const element = document.getElementById(elementId);
                const isAudioPlaying = element?.querySelector('audio');
                const isVideoPlaying = element?.querySelector('video');
                const staffVideoMuted = userExtRoleType === Role.Staff && !seat.isOwnerOpenVideo;
                const isSelf = state.userInfo?.accountId === seat.uid;
                if (seat.isOwnerOpenAudio && element && !isAudioPlaying && !isSelf) {
                  // 防止重复渲染
                  console.log('userId', seat.uid);
                  mtRoom?.setUserMicrophoneWindowView(seat.uid, elementId);
                }
                if (seat.isOwnerOpenVideo && element && !isVideoPlaying) {
                  // 防止重复渲染
                  mtRoom?.setUserCameraWindowView(seat.uid, elementId);
                }
                return (
                  <div
                    id={elementId}
                    key={elementId}
                    className={classNames({
                      [styles.fullContainer]: elementId.includes(Role.Staff),
                    }, userExtRoleType)}
                    style={{ display: staffVideoMuted ? 'none' : 'block' }}
                  />
                );
              })
            }
            {
              role === Role.Professor && (
                <WhiteBoardToolBar
                  className={styles.wbBar}
                  whiteBoard={state.whiteBoard}
                  documentChanged={documentChanged}
                />
              )
            }
            <div
              className={styles.wbContainer}
              id="canvasBox"
            >
              {
                role === Role.Student && <div className={styles.wbCover} />
              }
            </div>
            <div
              className={styles.rtPlayer}
              id="rtPlayer"
            />
            <BaseIcon
              style={{ display: 'none' }}
              className={styles.IconScreenToggle}
              src={screenShare ? IconScreenFont : IconScreenBack}
              onClick={() => setScreenShare(!screenShare)}
            />
          </div>
        </RTCRoom>
        <IMRoom
          className={styles.IMModule}
          header={(
            <div className={styles.IMModuleHeader}>
              聊天 (
              {messages.length}
              )
            </div>
          )}
          body={(
            <IMMessageList
              messages={
                messages.filter(
                  (msg) => ['welcome', 'pub_chat_text', 'quit_room'].includes(msg.action),
                )
              }
            />
          )}
          footer={(
            <IMChatInput
              inputVal={inputVal}
              onInputChange={(event) => setInputVal(event.target.value)}
              onSend={onSubmit}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Room;
