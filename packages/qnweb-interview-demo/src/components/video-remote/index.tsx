import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Track, TrackBaseInfo, TrackModeSession, User } from 'pili-rtc-web';
import { Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import { BaseUserInfo } from '@/api';
import Icon from '../icon';
import { QNRTCDisconnectCode } from '@/config';
import { getLocalTracks } from '@/sdk';

import './index.scss';

export type LeaveUser = User & {
  leaveTime: number;
}

export interface VideoRemoteProps extends React.HTMLAttributes<HTMLDivElement> {
  interviewId: string;
  roomToken: string;
  onlineUserList?: BaseUserInfo[];
  allUserList?: BaseUserInfo[];
  userInfo?: BaseUserInfo;
  title?: string;
  showLeaveInterview: boolean;
  onBroadcastUserLeave?: (user: any) => void;
  roomSession: TrackModeSession | null;
  leaveRoom: () => void;
  endRoom: () => void;
  roleCode?: number;
}

export interface RTCDisconnectRes {
  code: keyof typeof QNRTCDisconnectCode;
  data: { userId: string };
}

// 摄像头
const isCameraTrack = (track: Track) => {
  // 兼容小程序无法自定义tag的问题
  return track.info.kind === 'video' && track.info.tag !== 'screen';
};

// 音频
const isAudioTrack = (track: Track) => track.info.kind === 'audio';

// 屏幕共享
const isScreenTrack = (track: Track) => track.info.kind === 'video' && track.info.tag === 'screen';

const VideoRemote: React.FC<VideoRemoteProps> = props => {
  const {
    className, roomToken, title, showLeaveInterview,
    userInfo, allUserList, onBroadcastUserLeave,
    roomSession, leaveRoom, endRoom, roleCode
  } = props;

  const remoteCamera = useRef<HTMLDivElement>(null);
  const localCamera = useRef<HTMLDivElement>(null);
  const remoteScreen = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [win, setWin] = useState({
    bigWin: '',
    smallWin: ''
  });

  const [publishedMedia, setPublishedMedia] = useState({
    camera: false,
    audio: false
  });

  const [screen, setScreen] = useState(false);
  const [toggleBigWinIcon, setToggleBigWinIcon] = useState(false);
  const [remoteCameraShow, setRemoteCameraShow] = useState(false);
  const [mergeStreamTracksCount, setMergeStreamTracksCount] = useState(0);

  /**
   * 监听房间其他用户发布Track
   * @link https://doc.qnsdk.com/rtn/web/docs/api_track_mode_session#26_3
   * @param roomSession
   * @param element
   */
  function monitorTrackAdd(roomSession: TrackModeSession) {
    roomSession.on('track-add', (trackInfoList: Array<TrackBaseInfo>) => {
      roomSession.subscribe(trackInfoList.map(info => info.trackId || '')).then(remoteTracks => {
        remoteTracks.forEach(track => {
          if (remoteCamera.current && isCameraTrack(track)) {
            track.play(remoteCamera.current);
            setRemoteCameraShow(true);
          }
          if (isAudioTrack(track)) {
            track.play(document.body);
          }
          if (remoteScreen.current && isScreenTrack(track)) {
            track.play(remoteScreen.current);
            setToggleBigWinIcon(true);
          }
        });
        setWin({
          smallWin: 'local',
          bigWin: remoteTracks.some(track => isScreenTrack(track)) ? 'remote-screen' : 'remote-camera'
        });
        setMergeStreamTracksCount(count => count + 1);
      });
    });
  }

  /**
   * 监听其他原因导致和房间连接断开且不可恢复
   * @link https://doc.qnsdk.com/rtn/web/docs/api_track_mode_session#26_8
   * @param roomSession
   */
  function monitorDisconnect(roomSession: TrackModeSession) {
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

  /**
   * 房间有除自己以外的用户离开
   * @link https://doc.qnsdk.com/rtn/web/docs/api_stream_mode_session#19_2
   * @param roomSession
   */
  function monitorUserLeave(roomSession: TrackModeSession) {
    roomSession.on('user-leave', (user: User) => {
      console.log('-----user-leave', user);
      setRemoteCameraShow(false);
      setWin({
        smallWin: '',
        bigWin: 'local'
      });
      onBroadcastUserLeave && onBroadcastUserLeave({
        ...user,
        leaveTime: Date.now()
      });
    });
  }

  /**
   * 采集并发布本地的音视频轨
   */
  async function publishLocalTracks() {
    if (!roomSession) return;
    try {
      const { status, tracks: localTracks } = await getLocalTracks({
        audio: { enabled: true, tag: 'audio', channelCount: 1 },
        video: { enabled: true, tag: 'camera', width: 3840, height: 2160, frameRate: 60, bitrate: 13500 }
      });
      const localCameraElement = localCamera.current;
      localTracks.forEach(track => {
        if (localCameraElement) {
          if (isCameraTrack(track)) {
            track.play(localCameraElement);
            track.setMaster(true);
          }
          if (isAudioTrack(track)) {
            track.setMaster(true);
          }
        }
      });
      const camera = localTracks.some(track => isCameraTrack(track));
      const audio = localTracks.some(track => isAudioTrack(track));
      if (status === 'failed') {
        Modal.error({
          title: '没有权限',
          content: '获取摄像头/麦克风权限被拒绝，请手动打开摄像头/麦克风权限后重新进入房间'
        });
      }
      await roomSession.publish(localTracks);
      setPublishedMedia({
        camera,
        audio
      });
      setMergeStreamTracksCount(count => count + 1);
    } catch (e) {
      Modal.error({
        title: '提示',
        content: JSON.stringify(e)
      });
    }
  }

  /**
   * 订阅远端的音视频轨
   */
  async function subscribeRemoteTracks() {
    if (!roomSession) return;
    const remoteTracks = await roomSession.subscribe(roomSession.trackInfoList.map(info => info.trackId || ''));
    remoteTracks.forEach(track => {
      if (
        remoteCamera.current &&
        isCameraTrack(track)
      ) {
        track.play(remoteCamera.current);
        setRemoteCameraShow(true);
      }
      if (isAudioTrack(track)) {
        track.play(document.body);
      }
      if (remoteScreen.current && isScreenTrack(track)) {
        track.play(remoteScreen.current);
        setToggleBigWinIcon(true);
      }
    });
    setMergeStreamTracksCount(count => count + 1);
  }

  /**
   * 将自己本地已经发布的 Track 对象静音或者取消静音
   * 这个静音动作会被广播给全房间，其他用户可以通过 mute-tracks 事件来感知。
   * @link https://doc.qnsdk.com/rtn/web/docs/api_track_mode_session#14
   * @param config
   */
  async function toggleMuteTracks(config: {
    roomSession: TrackModeSession,
    tracks: Track[],
    muted: boolean,
    trackType?: 'audio' | 'camera'
  }) {
    const { roomSession, tracks, muted, trackType } = config;
    const filteredTracks = trackType ? tracks.filter(track => {
      if (trackType === 'audio') return isAudioTrack(track);
      if (trackType === 'camera') return isCameraTrack(track);
    }) : tracks;
    const muteTracks = filteredTracks.map(track => ({ trackId: track.info.trackId || '', muted }));
    roomSession.muteTracks(muteTracks);
  }

  /**
   * 点击按钮操作进行切换显隐
   * @param type
   */
  function updatePublishedMedia(type: keyof typeof publishedMedia) {
    if (!roomSession) return;
    setPublishedMedia(prevState => {
      const muted = prevState[type];
      toggleMuteTracks({
        roomSession,
        tracks: roomSession.publishedTracks,
        muted,
        trackType: type
      });
      return {
        ...prevState,
        [type]: !muted
      };
      return prevState;
    });
  }

  function monitorTrackRemove(roomSession: TrackModeSession) {
    roomSession.on('track-remove', (tracks: TrackBaseInfo[]) => {
      const screen = tracks.some(v => v.tag === 'screen');
      const remoteCameraShow = tracks.some(v => v.tag === 'camera');
      if (remoteCameraShow) setRemoteCameraShow(false);
      if (screen) {
        setToggleBigWinIcon(false);
      }
      setMergeStreamTracksCount(count => count + 1);
    });
  }

  useEffect(() => {
    (async function loadRoom() {
      try {
        if (!roomSession) return;
        await roomSession.joinRoomWithToken(roomToken);
        await publishLocalTracks();
        await subscribeRemoteTracks();
        monitorMuteTracks(roomSession);
        monitorTrackAdd(roomSession);
        monitorTrackRemove(roomSession);
        monitorDisconnect(roomSession);
        monitorUserLeave(roomSession);
        if (roomSession.subscribedTracks.length) {
          setWin({
            smallWin: 'local',
            bigWin: roomSession.subscribedTracks.some(track => isScreenTrack(track)) ? 'remote-screen' : 'remote-camera'
          });
        } else {
          setWin({
            smallWin: '',
            bigWin: 'local'
          });
        }
      } catch (e) {
        Modal.error({
          title: '加入房间失败',
          content: JSON.stringify(e)
        });
      }
    })();
    return () => {
      if (!roomSession) return;
      roomSession.publishedTracks.forEach(
        track => track.release()
      );
      roomSession.leaveRoom();
    };
  }, [roomToken, roomSession]);

  function monitorMuteTracks(roomSession: TrackModeSession) {
    roomSession.on('mute-tracks', (tracks: Array<{ trackId: string, muted: boolean }>) => {
      const cameraTrack = roomSession.subscribedTracks.find(v => isCameraTrack(v));
      if (!cameraTrack) return;
      tracks.forEach(v => {
        if (v.trackId === cameraTrack.info.trackId) {
          setRemoteCameraShow(!cameraTrack.info.muted);
        }
      });
    });
  }

  // 本地切换屏幕共享
  async function onToggleScreen() {
    if (!roomSession) return;
    // screen 为 true 的时候：此时屏幕共享开启，那么当前点击事件即为关闭屏幕共享
    // screen 为 false 的时候：此时屏幕共享关闭，那么当前点击事件即为开启屏幕共享
    console.log('roomSession.subscribedTracks', roomSession.subscribedTracks);
    const isRemoteUseScreen = roomSession.subscribedTracks.some(st => isScreenTrack(st));
    if (isRemoteUseScreen) {
      Modal.error({
        content: '对方正在共享屏幕，你无法共享屏幕'
      });
      return;
    }
    if (screen) {
      await roomSession.unpublish(
        roomSession.publishedTracks
          .filter(v => v.info.tag === 'screen')
          .map(v => v.info.trackId || '')
      );
    } else {
      const { tracks } = await getLocalTracks({
        screen: {
          enabled: true,
          source: 'window',
          tag: 'screen'
        }
      });
      if (!tracks.length) return;
      // tracks.map(v => v.info.tag === 'camera' && v.setMaster(true));
      await roomSession.publish(tracks);
    }
    console.log('roomSession.publishedTracks', roomSession.publishedTracks);
    roomSession.publishedTracks.map(track => {
      if (isScreenTrack(track)) {
        track.once('ended', async () => {
          await roomSession.unpublish(
            roomSession.publishedTracks
              .filter(v => v.info.tag === 'screen')
              .map(v => v.info.trackId || '')
          );
          console.log('track end roomSession.publishedTracks', roomSession.publishedTracks);
          setScreen(false);
        });
      }
    });
    setScreen(!screen);
  }

  function onToggleBigWin() {
    if (!roomSession) return;
    const allWin = ['local', 'remote-camera', 'remote-screen'];
    const preparedWin = allWin.filter(w => w !== win.smallWin && w !== win.bigWin)[0];
    const hasRemoteScreenTrack = roomSession.subscribedTracks.some(track => isScreenTrack(track));
    if (!hasRemoteScreenTrack) return;
    setWin({
      ...win,
      bigWin: preparedWin
    });
    setToggleBigWinIcon(!toggleBigWinIcon);
  }

  function onToggleWin(clickWin: string) {
    console.log('clickWin', clickWin);
    if (clickWin === win.smallWin) {
      setWin({
        smallWin: win.bigWin,
        bigWin: win.smallWin
      });
      console.log('当前点击的是小屏，可以切换');
    }
  }

  function mergePublishedTracks() {
    if (!roomSession) return;
    const { publishedTracks } = roomSession;
    publishedTracks.forEach(pubTrack => {
      const { trackId } = pubTrack.info;
      if (isCameraTrack(pubTrack) && trackId) {
        roomSession.addMergeStreamTracks([
          { trackId, x: 500, y: 40, w: 100, h: 100, z: 3 }
        ]);
      }
      if (isAudioTrack(pubTrack) && trackId) {
        roomSession.addMergeStreamTracks([
          { trackId }
        ]);
      }
    });
  }

  function mergeSubscribedTracks() {
    if (!roomSession) return;
    const { subscribedTracks } = roomSession;
    subscribedTracks.forEach(subTrack => {
      const { trackId } = subTrack.info;
      if (isCameraTrack(subTrack) && trackId) {
        roomSession.addMergeStreamTracks([
          { trackId, x: 0, y: 0, w: 640, h: 480 }
        ]);
      }
      if (isAudioTrack(subTrack) && trackId) {
        roomSession.addMergeStreamTracks([
          { trackId }
        ]);
      }
      if (isScreenTrack(subTrack) && trackId) {
        roomSession.addMergeStreamTracks([
          { trackId, x: 0, y: 0, w: 640, h: 480, z: 2 }
        ]);
      }
    });
  }

  function removeMergedTracks() {
    if (!roomSession) return;
    const { publishedTracks, subscribedTracks } = roomSession;
    const needRemoveTrackIds = [...publishedTracks, ...subscribedTracks].map(t => t.info.trackId || '');
    return roomSession.removeMergeStreamTracks(needRemoveTrackIds);
  }

  useEffect(() => {
    if (!roomSession) return;
    if (roleCode === 1) {
      if (roomSession.roomState !== 2) return;
      mergePublishedTracks();
      mergeSubscribedTracks();
    }
  }, [roleCode, mergeStreamTracksCount, roomSession]);

  const remoteUser = allUserList?.find(user => user.accountId !== userInfo?.accountId);

  return <div className={classNames('video-remote', className)}>
    <div className="title">{title}</div>
    <div className="video-wrap">
      <div
        className={classNames('remote-camera', 'remote-camera-mirror', 'hidden', {
          'small-win': win.smallWin === 'remote-camera',
          'big-win': win.bigWin === 'remote-camera'
        })}
        ref={remoteCamera}
        onClick={() => onToggleWin('remote-camera')}
      >
        {remoteUser && win.smallWin === 'remote-camera' &&
          <div className="user-bar user-bar-mirror">{remoteUser.nickname}</div>}
      </div>
      {
        !remoteCameraShow && <div
          className={classNames('remote-camera', 'remote-camera-cover', 'hidden', {
            'small-win': win.smallWin === 'remote-camera',
            'big-win': win.bigWin === 'remote-camera'
          })}
          onClick={() => onToggleWin('remote-camera')}
        >
          <img src={remoteUser?.avatar} alt=""/>
          {remoteUser && win.smallWin === 'remote-camera' && <div className="user-bar">{remoteUser.nickname}</div>}
        </div>
      }

      <div
        className={classNames('remote-screen', 'hidden', {
          'small-win': win.smallWin === 'remote-screen',
          'big-win': win.bigWin === 'remote-screen'
        })}
        onClick={() => onToggleWin('remote-screen')}
        ref={remoteScreen}
      >
        {remoteUser && win.smallWin === 'remote-screen' && <div className="user-bar">{remoteUser.nickname}</div>}
      </div>

      <div
        className={classNames('wrap-local-camera', 'hidden', {
          'small-win': win.smallWin === 'local',
          'big-win': win.bigWin === 'local'
        })}
        onClick={() => onToggleWin('local')}
      >
        <div className="local-camera local-camera-mirror" ref={localCamera}></div>
        {
          userInfo && <div className="local-camera local-camera-cover">
            {!publishedMedia.camera && <img src={userInfo.avatar} alt=""/>}
            {win.smallWin === 'local' && <div className="local-camera-username">{userInfo.nickname}</div>}
          </div>
        }
      </div>

      <div className="action">
        {
          <Icon
            className="button"
            onClick={() => {
              updatePublishedMedia('audio');
            }}
            type={publishedMedia.audio ? 'iconMicrophoneOn' : 'iconMicrophoneOff'}
          />
        }
        {
          <Icon
            className="button"
            onClick={leaveRoom}
            type="iconHangup"
          />
        }
        {
          <Icon
            className="button"
            onClick={() => {
              updatePublishedMedia('camera');
            }}
            type={publishedMedia.camera ? 'iconVideoOn' : 'iconVideoOff'}
          />
        }
      </div>
    </div>
    <div className="footer-bar">
      <div className="footer-bar--l">
        <div className="footer-bar--l-icon" onClick={onToggleScreen}>
          <Icon type={screen ? 'iconShareScreenOn' : 'iconShare'}/>
          <span className="footer-bar--l-icon-text">{screen ? '停止共享' : '屏幕共享'}</span>
        </div>
        {/*<div className='footer-bar--l-icon'>*/}
        {/*  <icon type='icon-whiteboard'/>*/}
        {/*  <span className='footer-bar--l-icon-text'>白板</span>*/}
        {/*</div>*/}
      </div>
      <div className="footer-bar--r">
        <Button type="primary" className="bar-btn" onClick={leaveRoom}>离开面试房间</Button>
        {showLeaveInterview && <Button danger type="primary" className="bar-btn" onClick={endRoom}>结束本轮面试</Button>}
      </div>
    </div>
    <Icon
      style={{ cursor: 'pointer' }}
      type={toggleBigWinIcon ? 'iconScreen' : 'iconScreen2'}
      className="subscribe-screen-icon"
      onClick={onToggleBigWin}
    />
  </div>;
};

export default VideoRemote;
