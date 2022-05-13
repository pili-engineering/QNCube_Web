import React, { useEffect, useRef, useState } from 'react';
import { message, Modal } from 'antd';
import { ClientRoleType } from 'qnweb-high-level-rtc';
import { QNCameraVideoTrack, QNMicrophoneAudioTrack, QNScreenVideoTrack, QNTrack } from 'qnweb-rtc';
import { TrackInfoPanel, TrackInfoPanelProps } from 'qnweb-cube-ui';

import 'qnweb-cube-ui/dist/index.css';

import useMtTrackRoom from '@/hooks/useMtTrackRoom';
import ExamApi from '@/api/ExamApi';
import { getUrlQueryParams } from '@/utils';

import styles from './index.module.scss';
import { useInterval } from 'ahooks';

const MobileCamera = () => {
  const urlQueryRef = useRef({
    roomId: getUrlQueryParams('roomId') || '',
  });
  const { room: mtTrackRoom } = useMtTrackRoom();

  const [publishedTracks, setPublishedTracks] = useState<QNTrack[]>([]);
  const [trackInfo, setTrackInfo] = useState<TrackInfoPanelProps>();

  // track 信息面板
  useInterval(() => {
    console.log('trackInfo', trackInfo);
    setTrackInfo({
      videoStatus: (publishedTracks.find(track => track.tag === 'camera') as QNCameraVideoTrack)?.getStats()[0],
      audioStatus: (publishedTracks.find(track => track.tag === 'microphone') as QNMicrophoneAudioTrack)?.getStats(),
      screenStatus: (publishedTracks.find(track => track.tag === 'screen') as QNScreenVideoTrack)?.getStats()[0],
    });
  }, publishedTracks.length > 0 ? 1000 : undefined);

  /**
   * 加入rtc房间
   */
  useEffect(() => {
    if (mtTrackRoom) {
      const hide = message.loading('加入房间中...', 0);
      mtTrackRoom.setClientRoleType(ClientRoleType.CLIENT_ROLE_BROADCASTER);
      mtTrackRoom.setUpLocalCameraParams({
        facingMode: 'user',
      });
      ExamApi.examRoomToken({
        roomId: urlQueryRef.current.roomId,
      })
        .then((result) => {
          return mtTrackRoom.joinRoom({
            roomToken: result.roomToken,
          }, {
            userExtRoleType: 'mobile',
          });
        })
        .then(() => mtTrackRoom.enableCamera())
        .then(() => {
          return new Promise((resolve, reject) => {
            Modal.info({
              title: '点击确认播放视频',
              okText: '确认',
              onOk() {
                resolve(
                  mtTrackRoom.setLocalCameraWindowView('mobile-camera')
                );
              },
              onCancel() {
                reject(new Error('cancel'));
              }
            });
          });
        })
        .then(() => {
          const tracks = [
            mtTrackRoom.localCameraTrack as QNCameraVideoTrack,
            mtTrackRoom.localMicrophoneTrack as QNMicrophoneAudioTrack
          ].filter(Boolean);
          setPublishedTracks(tracks);
          message.success('加入成功');
        })
        .catch((error) => {
          Modal.error({
            title: '开启摄像头失败',
            content: JSON.stringify(error),
          });
        })
        .finally(() => hide());
    }
  }, [mtTrackRoom]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      mtTrackRoom.leaveRoom();
    };
    if (mtTrackRoom) {
      window.addEventListener('beforeunload', handler);
      return () => {
        mtTrackRoom.leaveRoom();
        window.removeEventListener('beforeunload', handler);
      };
    }
  }, [mtTrackRoom]);

  return (
    <>
      <div className={styles.container} id="mobile-camera"/>
      <TrackInfoPanel
        videoStatus={trackInfo?.videoStatus}
        isMobile={true}
      />
    </>
  );
};

export default MobileCamera;
