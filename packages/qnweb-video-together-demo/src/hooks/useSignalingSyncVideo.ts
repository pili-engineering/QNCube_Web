import { useEffect, useState } from 'react';
import { ChannelAttributesChangeJson, ChannelAttributesChangeValueJson } from 'qnweb-high-level-rtc';
import { Modal } from 'antd';

export interface IMovieInfo {
  desc: string;
  director: string;
  duration: number;
  image: string;
  movieId: string;
  name: string;
  playUrl: string;
}

const log = (...data: any[]) => {
  window.console.log('room useSignalingSyncVideo', ...data);
};

export type MovieSignaling = ChannelAttributesChangeValueJson<IMovieInfo>;

/**
 * 信令同步视频进度
 * @param videoMessages
 * @param defaultIsOpen
 */
const useSignalingSyncVideo = (
  videoMessages: ChannelAttributesChangeJson[],
  defaultIsOpen: boolean,
) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  /**
   * 视频重播
   * @param video
   */
  const playVideo = (video: HTMLVideoElement) => {
    video.play().catch((err) => {
      log('playVideo err', err);
      setIsOpen(false);
      video.pause();
      Modal.error({
        title: '视频播放出错',
        content: '点击确认重新同步播放',
        onOk() {
          setIsOpen(true);
        },
      });
    });
  };

  /**
   * 开始同步视频进度
   * @param signaling
   */
  const startSyncVideo = (signaling: MovieSignaling) => {
    const video = document.querySelector<HTMLVideoElement>('#video');
    if (video) {
      log('startSyncVideo');
      if (signaling.playStatus === 0) {
        video.currentTime = signaling.currentPosition / 1000;
        log('视频播放暂停');
        video.pause();
      }
      if (signaling.playStatus === 1 && video.readyState >= 2) {
        video.currentTime = signaling.currentPosition / 1000;
        log('视频播放开始');
        playVideo(video);
      }
    }
  };

  /**
   * im信令视频同步
   */
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>('#video');
    log('isOpen', isOpen);
    if (isOpen && video) {
      const prevMessage = videoMessages[videoMessages.length - 2];
      const currentMessage = videoMessages[videoMessages.length - 1];
      if (!prevMessage && !currentMessage) return;
      if (currentMessage && !prevMessage) {
        log('first sync');
        const currentMessageValueJson: MovieSignaling = JSON.parse(currentMessage.data.value);
        startSyncVideo(currentMessageValueJson);
        return;
      }
      const prevSignaling: MovieSignaling = JSON.parse(prevMessage.data.value);
      const currentSignaling: MovieSignaling = JSON.parse(currentMessage.data.value);
      const isPlayStatusChanged = currentSignaling.playStatus !== prevSignaling.playStatus;
      // 播放进度超过2秒，需要同步
      const limitGap = Math.abs(
        currentSignaling.currentPosition / 1000 - video.currentTime,
      );
      const isOvertime = limitGap > 2;
      if (isPlayStatusChanged || isOvertime) {
        startSyncVideo(currentSignaling);
      }
    }
  }, [videoMessages, isOpen]);
  return {
    isOpen,
    setIsOpen,
  };
};

export default useSignalingSyncVideo;
