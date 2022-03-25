import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { message, Modal } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { QNConnectionDisconnectedInfo, QNConnectionState } from 'qnweb-rtc';
import { getUrlQueryParams } from '@/util/url';
import useBulletMessage from '@/hooks/useBulletMessage';
import useVideoMessage from '@/hooks/useVideoMessage';
import useInitBaseRoom from '@/hooks/useInitBaseRoom';
import useRenderAvatarSeats from '@/hooks/useRenderAvatarSeats';
import useRenderBullet from '@/hooks/useRenderBullet';
import useSignalingSyncVideo, { MovieSignaling } from '@/hooks/useSignalingSyncVideo';
import styles from './index.module.scss';
import AvatarSeat from './avatar-seat';
import useRoomCreator from '@/hooks/useRoomCreator';
import useBaseRoomHeartBeat from '@/hooks/useBaseRoomHeartBeat';
import useQNIM from '@/hooks/useQNIM';
import useToast from '@/hooks/useToast';
import useQNRTC from '@/hooks/useQNRTC';
import { useUnmount } from 'ahooks';
import ErrorBoundaryFallback from '@/components/error-boundary-fallback';
import { baseLeaveRoomApi } from '@/api/baseRoomApi';

const log = (...data: any[]) => {
  window.console.log('debugger Room', ...data);
};

const Room = () => {
  const history = useHistory();
  const [invitationCode] = useState(() => getUrlQueryParams('invitationCode'));
  const {
    baseRoomInfo, baseRoomJoined, imConfig, stateUserInfo,
    baseRtcInfo, movieValue, baseAllUserList,
  } = useInitBaseRoom(invitationCode);
  // 心跳
  useBaseRoomHeartBeat(baseRoomInfo?.roomId as string, baseRoomJoined);

  const { adapter, joinState: imJoinState, chatRoomId } = useQNIM(imConfig);
  // 弹幕消息
  const { currentMessage: currentBulletMessage } = useBulletMessage(adapter, stateUserInfo);
  // 视频同步消息
  const {
    messages: videoMessages,
    currentMessage: currentVideoMessage,
  } = useVideoMessage(adapter, stateUserInfo);
  // im连接状态提示
  useToast(imJoinState, '聊天室');
  const { joinState: rtcJoinState, seats, rtcClient } = useQNRTC(
    baseRtcInfo?.roomToken,
    baseRoomInfo?.roomId,
    imConfig?.chatRoomId || '',
    imJoinState === 'joined'
  );
  // rtc连接提示
  useToast(rtcJoinState, 'RTC房间');
  // 渲染avatar座位
  const { leftAvatarSeat, rightAvatarSeat } = useRenderAvatarSeats(
    rtcClient, rtcJoinState, seats, stateUserInfo,
    baseRoomInfo?.creator,
  );
  useRenderBullet(currentBulletMessage);
  const [playUrl, setPlayUrl] = useState<string>();
  const [leftAvatarPlaceholder, setLeftAvatarPlaceholder] = useState<string>();
  const [rightAvatarPlaceholder, setRightAvatarPlaceholder] = useState<string>();
  // 信令同步视频进度
  const {
    // isOpen: isSignalingSyncOpen,
    setIsOpen: setIsSignalingSyncOpen,
  } = useSignalingSyncVideo(videoMessages, false);

  // 监听房主是否离开房间
  const { isSitUp } = useRoomCreator(rtcClient, baseRoomInfo?.creator);

  useEffect(() => {
    const handleConnectionStateChanged = (
      connectionState: QNConnectionState,
      info: QNConnectionDisconnectedInfo,
    ) => {
      if (connectionState === 'DISCONNECTED') {
        Modal.error({
          title: 'RTC连接失败',
          content: JSON.stringify(info),
          onOk() {
            history.push('/room-list');
          },
        });
      }
    };
    const handleUnload = () => {
      log('handleUnload');
      rtcClient?.rtcClient.off('connection-state-changed', handleConnectionStateChanged);
      rtcClient?.leaveRoom();
    };
    if (rtcClient) {
      rtcClient.setFilteredTrackTypes(['admin']);
      rtcClient.rtcClient.on('connection-state-changed', handleConnectionStateChanged);
      window.addEventListener('beforeunload', handleUnload);
      return () => {
        rtcClient.rtcClient.off('connection-state-changed', handleConnectionStateChanged);
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, [history, rtcClient]);

  useEffect(() => {
    if (isSitUp) {
      Modal.info({
        title: '房间已经解散了~',
        onOk() {
          history.push('/room-list');
        },
      });
    }
  }, [history, isSitUp]);

  useEffect(() => {
    const leftUser = baseAllUserList?.find((user) => user.userId === leftAvatarSeat?.uid);
    const rightUser = baseAllUserList?.find((user) => user.userId === rightAvatarSeat?.uid);
    setLeftAvatarPlaceholder(leftUser?.avatar);
    setRightAvatarPlaceholder(rightUser?.avatar);
  }, [leftAvatarSeat, rightAvatarSeat, baseAllUserList]);

  /**
   * 初始化同步视频
   */
  useEffect(() => {
    if (movieValue) {
      // http 请求同步视频进度
      const movieJson: MovieSignaling = JSON.parse(movieValue);
      const { movieInfo } = movieJson;
      const video = document.querySelector<HTMLVideoElement>('#video');
      if (video) {
        setPlayUrl(movieInfo.playUrl);
        video.currentTime = movieJson.currentPosition / 1000;
        setIsSignalingSyncOpen(true);
      }
    }
  }, [movieValue, setIsSignalingSyncOpen]);

  /**
   * 接收到信令就用信令同步视频
   */
  useEffect(() => {
    if (currentVideoMessage) {
      // 信令同步视频进度
      const signaling: MovieSignaling = JSON.parse(
        currentVideoMessage.data.value,
      );
      setPlayUrl(signaling.movieInfo.playUrl);
    }
  }, [currentVideoMessage]);

  /**
   * 卸载
   * 退出im聊天室
   */
  useUnmount(() => {
    message.destroy('videoWaiting');
    if (chatRoomId) {
      adapter?.leaveChannel(chatRoomId).then(() => log('leaveChannel'));
    }
    rtcClient?.leaveRoom().then(() => {
      log('leaveRoom');
    });
    if (baseRoomInfo?.roomId && !isSitUp) {
      baseLeaveRoomApi({
        roomId: baseRoomInfo?.roomId,
      }).then(() => {
        log('baseLeaveRoomApi');
      });
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.videoPanel}>
        <div className={styles.bulletScreen} id="bulletScreen" />
        <video
          id="video"
          controls={false}
          src={playUrl}
          className={styles.video}
          playsInline
          onCanPlayThrough={(event) => {
            log('onCanPlayThrough', event);
            message.destroy('videoWaiting');
          }}
          onLoad={(event) => log('onLoad', event)}
          onLoadedData={(event) => log('onLoadedData', event)}
          onError={(event) => log('onError', event)}
          onWaiting={(event) => {
            log('onWaiting', event);
            message.loading({
              duration: 0,
              key: 'videoWaiting',
              content: '视频缓冲中...',
            });
          }}
        />
      </div>
      <div className={styles.micSeatPanel}>
        <AvatarSeat
          isCameraOpen={leftAvatarSeat?.isOwnerOpenVideo}
          avatar={leftAvatarPlaceholder}
          avatarId={leftAvatarSeat?.uid}
          avatarIdPrefix="uid"
          type={1}
          style={{ flexShrink: 0 }}
        />
        <div className={styles.qrCode} id="qrcode">
          {
            invitationCode ? (
              <div className={styles.qrCodePic}>
                <QRCode
                  value={`${window.location.origin}/chatroom?invitationCode=${invitationCode}`}
                  size={150}
                />
              </div>
            ) : null
          }
          <div className={styles.qrCodeTip}>扫描上方二维码进行实时弹幕互动</div>
        </div>
        <AvatarSeat
          isCameraOpen={rightAvatarSeat?.isOwnerOpenVideo}
          avatar={rightAvatarPlaceholder}
          avatarId={rightAvatarSeat?.uid}
          avatarIdPrefix="uid"
          type={2}
          style={{ flexShrink: 0 }}
        />
      </div>
    </div>
  );
};

export default withErrorBoundary(Room, {
  FallbackComponent: ErrorBoundaryFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
    log('onError', error, info);
  },
});
