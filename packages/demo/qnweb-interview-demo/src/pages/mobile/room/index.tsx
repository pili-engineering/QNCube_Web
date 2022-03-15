import Icon from '@/components/icon';
import Chat, { OnInputKeyEnterHandler } from '@/pages/mobile/components/chat';
import useSupported from '@/pages/mobile/hooks/useSupported';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import useJoinRoom from '@/pages/mobile/hooks/useJoinRoom';
import { deviceManager, Track, TrackModeSession } from 'pili-rtc-web';
import {
  isAudioTrack,
  isCameraTrack,
  isScreenTrack,
  publishTracks,
} from '@/sdk';
import { Modal, Button } from 'antd';
import { RTCDisconnectRes } from '@/components/video-remote';
import { QNRTCDisconnectCode } from '@/config';
import useInterviewHeartBeat from '@/pages/mobile/hooks/useInterviewHeartBeat';
import { endInterview, leaveInterview } from '@/api';
import css from './index.module.scss';
import useQNIM, { QNIMConfig } from '../hooks/useQNIM';
import { UserStoreContext } from '@/store';
import { BaseMessageJson, RtmManager } from 'qnweb-high-level-rtc';
import { useUnmount } from '@/hooks';

const MobileRoom = () => {
  const { state: userState } = useContext(UserStoreContext);
  const { interviewId } = useParams<{ interviewId: string }>();
  const [micro, setMicro] = useState(false);
  const [camera, setCamera] = useState(false);
  const [chatInputShow, setChatInputShow] = useState(false);
  const [mediaConfigIndex, setMediaConfigIndex] = useState(0);
  const [publishedTracks, setPublishedTracks] = useState<Track[]>([]);
  const [subscribedTracks, setSubscribedTracks] = useState<Track[]>([]);
  const [localTracks, setLocalTracks] = useState<Track[]>([]);
  const {
    isRoomJoined: isRTCRoomJoined, interview, allUserList, userInfo,
    roomSession, imConfig
  } = useJoinRoom(interviewId);
  const [win, setWin] = useState({ small: 'local-camera', big: 'remote-camera' });
  const [localCover, setLocalCover] = useState(true);
  const [remoteCover, setRemoteCover] = useState(true);
  const [activeDot, setActiveDot] = useState(0);
  const history = useHistory();
  const touch = useRef({
    startX: 0,
    endX: 0
  });
  const { showLeaveInterview } = useInterviewHeartBeat(interviewId);

  const { isBrowserSupported } = useSupported();
  const [isRTCRoomJoinedOk, setIsRTCRoomJoinedOk] = useState(false);
  const [mediaConfig] = useState([{
    audio: { enabled: true, tag: 'audio', channelCount: 1 },
    video: { enabled: true, tag: 'camera', facingMode: 'user', width: 3840, height: 2160, frameRate: 60, bitrate: 13500 }
  }, {
    audio: { enabled: true, tag: 'audio', channelCount: 1 },
    video: { enabled: true, tag: 'camera', facingMode: 'environment', width: 3840, height: 2160, frameRate: 60, bitrate: 13500 }
  }]);
  const [toggleCameraLoading, setToggleCameraLoading] = useState(false);
  const [qnImConfig, setQnImConfig] = useState<QNIMConfig>();
  const { joinState, adapter } = useQNIM(qnImConfig);
  const [messages, setMessages] = useState<BaseMessageJson[]>([]);

  /**
   * 房间清除
   */
  useUnmount(() => {
    const msg = JSON.stringify({
      action: 'quit_room',
      data: {
        senderId: userState.userInfo?.accountId,
        senderName: userState.userInfo?.nickname,
        msgContent: '离开了房间',
        avatar: userState.userInfo?.avatar,
        timestamp: Date.now(),
      },
    });
    adapter?.sendChannelMsg(
      msg, qnImConfig?.chatRoomId || '', true,
    );
    // if (qnImConfig?.chatRoomId) adapter?.leaveChannel(qnImConfig?.chatRoomId);
  });

  /**
   * 加入房间发送通知消息
   */
  useEffect(() => {
    if (joinState === 'joined' && adapter && qnImConfig?.chatRoomId) {
      const msg = JSON.stringify({
        action: 'pub_chat_text',
        data: {
          senderId: userState.userInfo?.accountId,
          senderName: userState.userInfo?.nickname,
          msgContent: '进入了房间',
          avatar: userState.userInfo?.avatar,
        },
      });
      adapter.sendChannelMsg(
        msg, qnImConfig?.chatRoomId, true,
      )
    }
  }, [
    adapter, joinState, qnImConfig?.chatRoomId,
    userState.userInfo?.accountId, userState.userInfo?.avatar,
    userState.userInfo?.nickname
  ])

  /**
   * 设置im消息监听
   */
  useEffect(() => {
    const channelMessageHandler = (receivedMessage: string) => {
      const json: BaseMessageJson = JSON.parse(receivedMessage);
      console.log('channelMessageHandler json', json);
      setMessages((prevMessages) => prevMessages.concat(json));
    };
    if (adapter && userState.userInfo?.accountId) {
      RtmManager.addRtmChannelListener(channelMessageHandler);
      return () => {
        RtmManager.removeRtmChannelListener(channelMessageHandler);
      };
    }
  }, [adapter, joinState, userState.userInfo?.accountId])

  /**
   * 设置im相关配置
   */
  useEffect(() => {
    setQnImConfig({
      appKey: 'cigzypnhoyno',
      loginAccount: {
        name: userState.imConfig?.imUsername,
        password: userState.imConfig?.imPassword
      },
      chatRoomId: imConfig?.imGroupId + ''
    })
  }, [imConfig, userState.imConfig?.imPassword, userState.imConfig?.imUsername])

  useEffect(() => {
    if (isRTCRoomJoined) {
      if (!isBrowserSupported) {
        Modal.error({
          title: '提示',
          content: '抱歉，当前浏览器不兼容，请尝试其他浏览器'
        });
      }
    }
    setIsRTCRoomJoinedOk(isRTCRoomJoined && isBrowserSupported);
  }, [isRTCRoomJoined, isBrowserSupported]);

  /**
   * 回车发送消息事件
   */
  const onInputKeyEnter: OnInputKeyEnterHandler = value => {
    if (adapter && value) {
      const msg = JSON.stringify({
        action: 'pub_chat_text',
        data: {
          senderId: userState.userInfo?.accountId,
          senderName: userState.userInfo?.nickname,
          msgContent: value,
          avatar: userState.userInfo?.avatar,
        },
      });
      adapter.sendChannelMsg(
        msg, qnImConfig?.chatRoomId || '', true,
      );
    }
  }

  /**
   * 大小屏切换
   */
  function onToggleWin() {
    setWin({
      small: win.big,
      big: win.small
    });
  }

  /**
   * mute设备
   * @param type
   */
  function onToggleMuteMedia(type: 'audio' | 'camera'): Promise<void> {
    if (roomSession) {
      return new Promise(resolve => {
        const tracks = roomSession.publishedTracks.filter(track => {
          if (type === 'camera') return isCameraTrack(track);
          if (type === 'audio') return isAudioTrack(track);
        }).map(track => ({ trackId: track.info.trackId || '', muted: !track.info.muted }));
        roomSession.muteTracks(tracks);
        resolve();
      });
    }
    return Promise.resolve();
  }

  function setSubscribeTracks() {
    if (roomSession) {
      const { subscribedTracks } = roomSession;
      const remoteCameraElement: HTMLDivElement | null = document.querySelector('#remote-camera');
      const remoteScreenElement: HTMLDivElement | null = document.querySelector('#remote-screen');
      const cameraTrack = subscribedTracks.find(track => isCameraTrack(track));
      const screenTrack = subscribedTracks.find(track => isScreenTrack(track));
      const audioTrack = subscribedTracks.find(track => isAudioTrack(track));
      if (remoteCameraElement) {
        if (cameraTrack) {
          cameraTrack.play(remoteCameraElement);
          setRemoteCover(cameraTrack.info.muted || false);
        } else {
          setRemoteCover(true);
        }
      }
      if (audioTrack) {
        audioTrack.play(document.body);
      }
      if (remoteScreenElement) {
        if (screenTrack) {
          screenTrack.play(remoteScreenElement);
          setWin({
            ...win,
            big: 'remote-screen'
          });
        } else {
          setWin({
            ...win,
            big: 'remote-camera'
          });
        }
      }
      setSubscribedTracks(subscribedTracks);
    }
  }

  /**
   * 订阅并播放流
   * @param roomSession
   */
  function subscribeTracks(roomSession: TrackModeSession) {
    roomSession.subscribe(
      roomSession.trackInfoList.map(track => track.trackId || '')
    ).then(() => {
      setSubscribeTracks();
    });
  }

  function monitorRoom(roomSession: TrackModeSession) {
    // 切换mute事件
    roomSession.on('mute-tracks', (tracks: Array<{ trackId: string, muted: boolean }>) => {
      const cameraTrack = roomSession.subscribedTracks.find(v => isCameraTrack(v));
      if (!cameraTrack) return;
      tracks.forEach(v => {
        if (v.trackId === cameraTrack.info.trackId) {
          setRemoteCover(cameraTrack.info.muted || false);
        }
      });
    });
    // 监听房间其他用户发布Track
    roomSession.on('track-add', () => {
      subscribeTracks(roomSession);
    });
    // 监听房间其他用户移除Track
    // roomSession.on('track-remove', () => {
    //   setSubscribeTracks();
    // });
    roomSession.on('user-leave', () => {
      setSubscribeTracks();
    });
    // 监听其他原因导致和房间连接断开且不可恢复
    roomSession.on('disconnect', (res: RTCDisconnectRes) => {
      const { code } = res;
      if (code === 10006) {
        Modal.error({
          title: '提示',
          content: QNRTCDisconnectCode[code],
          onOk() {
            history.goBack();
          }
        });
      }
    });
  }

  useEffect(() => {
    setActiveDot(0);
  }, [subscribedTracks]);

  // 加入房间
  useEffect(() => {
    if (isRTCRoomJoinedOk && roomSession) {
      setWin({
        small: 'local-camera',
        big: 'remote-camera'
      });
      subscribeTracks(roomSession);
      monitorRoom(roomSession);
    }

    return () => {
      if (isRTCRoomJoinedOk && roomSession) {
        roomSession.unpublish(publishedTracks.map(t => t.info.trackId || ''));
        localTracks.forEach(track => track.release());
        roomSession.leaveRoom();
      }
    };
  }, [isRTCRoomJoinedOk, roomSession]);

  // 采集设备并发布流
  useEffect(() => {
    if (isRTCRoomJoinedOk && roomSession) {
      /**
       * 取消发布
       */
      const cancelPublishTracks = (): Promise<void> => {
        setToggleCameraLoading(true);
        if (roomSession.publishedTracks.length) {
          return roomSession.unpublish(
            roomSession.publishedTracks.map(track => track.info.trackId || '')
          );
        }
        return Promise.resolve();
      };
      cancelPublishTracks()
        .then(() => deviceManager.getLocalTracks(mediaConfig[mediaConfigIndex]))
        .then(localTracks => {
          console.log('采集到的Track', localTracks);
          setLocalTracks(localTracks);
          localTracks.forEach(track => {
            if (isCameraTrack(track) || isAudioTrack(track)) {
              track.setMaster(true);
            }
          });
          return publishTracks(roomSession, localTracks);
        })
        .then(() => setPublishedTracks(roomSession.publishedTracks))
        .catch(error => {
          Modal.error({
            title: '错误提示',
            content: JSON.stringify(error)
          });
        })
        .finally(() => {
          setToggleCameraLoading(false);
        });
    }

  }, [isRTCRoomJoinedOk, mediaConfigIndex, roomSession]);

  // 发布并显示
  useEffect(() => {
    const localElement: HTMLDivElement | null = document.querySelector('#local-camera');
    publishedTracks.forEach(publishedTrack => {
      if (isCameraTrack(publishedTrack) && localElement) {
        const childrenElement = document.querySelector('#local-camera')?.children || [];
        Array.from(childrenElement).forEach(element => {
          if (element.tagName.toLowerCase() === 'video') {
            element.remove();
          }
        });
        setCamera(!publishedTrack.info.muted);
        publishedTrack.play(localElement);
        setLocalCover(false);
      }
      if (isAudioTrack(publishedTrack)) {
        setMicro(!publishedTrack.info.muted);
      }
    });
  }, [publishedTracks]);

  const remoteUser = useMemo(() => {
    return allUserList?.find(user => user.accountId !== userInfo?.accountId);
  }, [allUserList, userInfo]);

  const dots = useMemo(() => {
    const len = subscribedTracks.length ? subscribedTracks.length - 1 : 0;
    return Array.from(
      Array(len)
    );
  }, [subscribedTracks]);

  const onTouchStart: React.TouchEventHandler = event => {
    touch.current.startX = event.changedTouches[0].clientX;
  };

  const onTouchEnd: React.TouchEventHandler = event => {
    if (dots.length < 2) return;
    touch.current.endX = event.changedTouches[0].clientX;
    const { startX, endX } = touch.current;
    const allWin = ['remote-screen', 'remote-camera', 'local-camera'];
    const nextBigWin = allWin.find(w => !Object.values(win).includes(w));
    if (endX - startX !== 0 && nextBigWin) {
      setActiveDot(
        activeDot === 0 ? 1 : 0
      );
      setWin({
        ...win,
        big: nextBigWin
      });
    }
  };

  /**
   * 切换摄像头
   */
  const onToggleCamera = useCallback(() => {
    localTracks.map(track => track.release());
    setMediaConfigIndex(
      mediaConfigIndex === 0 ? 1 : 0
    );
  }, [mediaConfigIndex, localTracks]);

  return <div
    className={css.room}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <div
      className={classNames(css.userPlayer, {
        [css.userPlayerSmall]: win.small === 'remote-camera',
        [css.userPlayerBig]: win.big === 'remote-camera'
      })}
      id='remote-camera'
      onClick={() => {
        if (win.small === 'remote-camera') {
          onToggleWin();
        }
      }}
    >
      {
        remoteUser && remoteCover ?
          <img className={css.userPlayerCover} src={remoteUser.avatar} alt='' /> : null
      }
      {
        win.small === 'remote-camera' && remoteUser ?
          <div className={css.userPlayerUsername}>{remoteUser.nickname}</div> : null
      }
    </div>
    <div
      className={classNames(css.userPlayer, {
        [css.userPlayerSmall]: win.small === 'remote-screen',
        [css.userPlayerBig]: win.big === 'remote-screen'
      })}
      id='remote-screen'
      onClick={() => {
        if (win.small === 'remote-screen') {
          onToggleWin();
        }
      }}
    >
      {
        win.small === 'remote-screen' && remoteUser ?
          <div className={css.userPlayerUsername}>{remoteUser.nickname}</div> : null
      }
    </div>
    <div
      className={classNames(css.userPlayer, {
        [css.userPlayerSmall]: win.small === 'local-camera',
        [css.userPlayerBig]: win.big === 'local-camera'
      })}
      id='local-camera'
      onClick={() => {
        if (win.small === 'local-camera') {
          onToggleWin();
        }
      }}
    >
      {
        userInfo && localCover ?
          <img className={css.userPlayerCover} src={userInfo.avatar} alt='' /> : null
      }
      {
        userInfo && win.small === 'local-camera' ?
          <div className={css.userPlayerUsername}>{userInfo.nickname}</div> : null
      }
    </div>
    <div className={css.header}>
      <div className={css.leftIcons}>
        {
          showLeaveInterview ? <Icon
            type='icon-quit'
            className={css.leftButton}
            onClick={() => {
              history.goBack();
              return endInterview({
                interviewId
              });
            }}
          /> : null
        }
      </div>
      <div className={css.title}>{interview?.title}</div>
      <div className={css.rightIcons}>
        <Icon
          type='icon-chat'
          className={css.rightButton}
          onClick={useCallback(() => setChatInputShow(!chatInputShow), [chatInputShow])}
        />
        {/*<icon type='icon-share-mobile' className={css.rightButton}/>*/}
      </div>
    </div>
    <Chat
      className={css.chatContainer}
      list={messages}
      chatInputShow={chatInputShow}
      onInputKeyEnter={onInputKeyEnter}
      // translateTextLocal={translateTextLocal}
    />
    {
      dots.length >= 2 ? <div className={css.dots}>
        {
          dots.map((_, index) => {
            return <span className={classNames(css.dot, {
              [css.activeDot]: activeDot === index
            })}></span>;
          })
        }
      </div> : null
    }
    <div className={css.translateAudioSwitchContainer}>
      <Button type='primary' onClick={onToggleCamera} loading={toggleCameraLoading}>切换摄像头</Button>
    </div>
    <div className={css.buttons}>
      <Icon
        type={micro ? 'icon-microphone-on' : 'icon-microphone-off'}
        className={css.button}
        onClick={() => onToggleMuteMedia('audio').then(() => {
          setMicro(!micro);
        })}
      />
      <Icon
        type='icon-hangup'
        className={css.button}
        onClick={() => {
          history.goBack();
          return leaveInterview({
            interviewId
          });
        }}
      />
      <Icon
        type={camera ? 'icon-video-on' : 'icon-video-off'}
        className={css.button}
        onClick={() => onToggleMuteMedia('camera').then(() => {
          setCamera(!camera);
          setLocalCover(camera);
        })}
      />
    </div>
  </div>;
};

export default MobileRoom;