import { getLocalTracks, publishTracks } from '@/sdk';
import { RecordConfig, Track, TrackModeSession } from 'pili-rtc-web';
import { useEffect, useState } from 'react';

interface Config {
  roomSession: TrackModeSession, // 房间 Session
  deviceConfig: RecordConfig, // 需要采集的媒体设备
}

/**
 * 采集并发布本地的Track
 * @param config
 */
const useGetLocalTracksAndPublish = (config: Config) => {
  const [deviceConfig, setDeviceConfig] = useState<RecordConfig>(config.deviceConfig);
  // 是否有设备无法采集
  const [hasGetDeviceError, setHasGetDeviceError] = useState(false);

  useEffect(() => {
    const { deviceConfig, roomSession } = config;

    /**
     * 取消发布本地的Track
     * @param roomSession
     * @param tracks
     */
    function unPublishTracks(roomSession: TrackModeSession, tracks: Track[]): Promise<void> {
      return roomSession.unpublish(
        tracks.map(track => track.info.trackId || '')
      );
    }

    unPublishTracks(
      roomSession, roomSession.publishedTracks
    ).then(() => {
      return getLocalTracks(deviceConfig);
    }).then(res => {
      const { tracks: localTracks, status } = res;
      setHasGetDeviceError(status === 'failed');
      return publishTracks(roomSession, localTracks);
    });
  }, [config]);

  return {
    deviceConfig,
    setDeviceConfig,
    hasGetDeviceError
  }
};

export default useGetLocalTracksAndPublish;