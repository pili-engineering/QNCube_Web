import { deviceManager, RecordConfig, Track, TrackModeSession } from 'pili-rtc-web';

export interface LocalTracksRes {
  status: 'success' | 'failed';
  tracks: Track[];
}

// 摄像头
export function isCameraTrack(track: Track) {
  // 兼容小程序无法自定义tag的问题
  return track.info.kind === 'video' && track.info.tag !== 'screen';
}

// 音频
export function isAudioTrack(track: Track) {
  return track.info.kind === 'audio';
}

// 屏幕共享
export function isScreenTrack(track: Track) {
  return track.info.kind === 'video' && track.info.tag === 'screen';
}

/**
 * 采集本地的媒体数据，以 Track 的形式返回
 * 只返回采集成功的媒体数据
 * @link https://doc.qnsdk.com/rtn/web/docs/api_device_manager_track#1
 * @param config
 * @param config
 */
export async function getLocalTracks(config: RecordConfig): Promise<LocalTracksRes> {
  // [['video', {enabled: true, tag: 'video'}], ['audio', {enabled: true, tag: 'audio'}]]
  const devices = Object.entries(config);
  const result = await Promise.allSettled(
    devices.map(
      ([key, value]) => {
        return deviceManager.getLocalTracks({
          [key]: value
        });
      }
    )
  );
  const successTracks = result.reduce<Track[]>((total, cur) => {
    if (cur.status === 'fulfilled') {
      total.push(...cur.value);
    }
    return total;
  }, []);
  const status = successTracks.length === devices.length ? 'success' : 'failed';
  return {
    status,
    tracks: successTracks
  };
}

/**
 * 发布tracks
 * @param roomSession
 * @param tracks
 */
export function publishTracks(roomSession: TrackModeSession, tracks: Track[]) {
  /**
   * 过滤出房间中已发布的track
   * 防止重复publish相同的track
   */
  const preparedPublishTracks = tracks.filter(track => {
    return roomSession.publishedTracks.every(
      publishedTrack => publishedTrack.info.trackId !== track.info.trackId
    );
  });
  return roomSession.publish(preparedPublishTracks);
}

