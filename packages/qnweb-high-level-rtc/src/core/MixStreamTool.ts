import {
  QNLocalTrack,
  QNRemoteAudioTrack,
  QNRemoteVideoTrack, QNTrack,
  QNTranscodingLiveStreamingConfig,
  QNTranscodingLiveStreamingTrack
} from 'qnweb-rtc';
import RtcRoom from './RtcRoom';
import { ExtQNClientEventName, ExtQNClientEventListener } from '../event-bus';
import { TAG_CAMERA, TAG_MICROPHONE, TAG_SCREEN } from '../constants';
import { LogModel } from '../util';
import { FunctionType } from '../types';

export type MixStreamJobConfig = Omit<QNTranscodingLiveStreamingConfig, 'streamID' | 'url'>;

export type MergeOption = Omit<QNTranscodingLiveStreamingTrack, 'trackID'>;

const transcodingLiveStreamingTrack: MergeOption = {
  /**
   * track 在合流画布中位置的 x 坐标
   */
  x: 0,
  /**
   * track 在合流画布中位置的 y 坐标
   */
  y: 0,
  /**
   * track 在合流画布中位置的层级
   */
  zOrder: 0,
  /**
   * track 在合流画布中相应位置的宽
   */
  width: 0,
  /**
   * track 在合流画布中相应位置的高
   */
  height: 0
};

const log = new LogModel('log');
log.setPreTitle('MixStreamTool');

/**
 * 混流
 */
class MixStreamTool {
  public rtcRoom?: RtcRoom;
  public tag = 'MixStreamManager';
  public tracksMap = new Map<string, MergeOption>();
  public toDoCameraMergeOptionsMap = new Map<string, MergeOption>();
  public toDoMicrophoneMergeOptionsMap = new Map<string, MergeOption>();
  public toDoScreenMergeOptionsMap = new Map<string, MergeOption>();
  public toDoCustomMergeOptionsMap = new Map<string, MergeOption>();
  public rtcEventMap: {
    [key: string]: (userID: string, tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]) => void;
  };
  public extRtcEventMap: {
    [eventName in ExtQNClientEventName]?: (tracks: QNLocalTrack[]) => void;
  };

  /**
   * 推流地址
   */
  getPushUri() {
    return this.rtcRoom?.roomEntity?.pushUri || '';
  }

  /**
   * 房间id
   */
  getStreamID() {
    return this.rtcRoom?.roomEntity?.streamID || '';
  }

  constructor(rtcRoom: RtcRoom) {
    this.rtcRoom = rtcRoom;
    this.rtcEventMap = {
      'user-published': this.handleUserPublished.bind(this),
      'user-unpublished': this.handleUserUnPublished.bind(this)
    };
    this.extRtcEventMap = {
      localPublished: this.handleLocalPublished.bind(this),
      localUnPublished: this.handleLocalUnPublished.bind(this),
      roomLeft: this.roomLeft.bind(this),
    };
    this.bindLiveStreamingListener();
  }

  /**
   * 监听publish更新ops
   * @param track
   * @private
   */
  private publishTracksToUpdateOps(track: QNTrack) {
    const userID = track.userID || '';
    log.log('publishTracksToUpdateOps', track.tag);
    if (track.tag === TAG_CAMERA) {
      const option = this.toDoCameraMergeOptionsMap.get(userID);
      if (option && track.trackID) {
        this.tracksMap.set(track.trackID, option);
        this.toDoCameraMergeOptionsMap.delete(userID);
        return this.resetOps();
      }
    }
    if (track.tag === TAG_MICROPHONE) {
      const option = this.toDoMicrophoneMergeOptionsMap.get(userID);
      if (option && track.trackID) {
        this.tracksMap.set(track.trackID, option);
        this.toDoMicrophoneMergeOptionsMap.delete(userID);
        return this.resetOps();
      }
    }
    if (track.tag === TAG_SCREEN) {
      const option = this.toDoScreenMergeOptionsMap.get(userID);
      if (option && track.trackID) {
        this.tracksMap.set(track.trackID, option);
        this.toDoScreenMergeOptionsMap.delete(userID);
        return this.resetOps();
      }
    }
    const option = this.toDoCustomMergeOptionsMap.get(userID);
    if (option && track.trackID) {
      this.tracksMap.set(track.trackID, option);
      this.toDoCustomMergeOptionsMap.delete(userID);
      return this.resetOps();
    }
  }

  /**
   * 监听远端用户发布track
   * @param userID
   * @param tracks
   */
  handleUserPublished(userID: string, tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]) {
    log.log('handleUserPublished', userID, tracks);
    tracks.forEach(this.publishTracksToUpdateOps.bind(this));
  }

  /**
   * 监听远端用户取消发布track
   * @param userID
   * @param tracks
   */
  handleUserUnPublished(userID: string, tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]) {
    log.log('handleUserUnPublished', userID, tracks);
    tracks.forEach(track => {
      if (track.trackID) this.tracksMap.delete(track.trackID);
    });
  }

  /**
   * 监听本地用户发布track
   * @param tracks
   */
  handleLocalPublished(tracks: QNLocalTrack[]) {
    log.log('handleLocalPublished', tracks);
    tracks.forEach(this.publishTracksToUpdateOps.bind(this));
  }

  /**
   * 监听本地用户取消发布track
   * @param tracks
   */
  handleLocalUnPublished(tracks: QNLocalTrack[]) {
    log.log('handleLocalUnPublished', tracks);
    tracks.forEach(track => {
      if (track.trackID) this.tracksMap.delete(track.trackID);
    });
  }

  /**
   * 设置监听
   */
  bindLiveStreamingListener() {
    log.log('bindLiveStreamingListener');
    for (const eventName in this.rtcEventMap) {
      this.rtcRoom?.rtcClient.on(eventName, this.rtcEventMap[eventName]);
    }
    for (const eventName in this.extRtcEventMap) {
      const listener = this.extRtcEventMap[eventName as ExtQNClientEventName];
      if (listener) {
        ExtQNClientEventListener.addExtEventListener(
          <ExtQNClientEventName>eventName,
          listener as FunctionType
        );
      }
    }
  }

  /**
   * 取消设置监听
   */
  unbindLiveStreamingListener() {
    for (const eventName in this.rtcEventMap) {
      this.rtcRoom?.rtcClient.off(eventName, this.rtcEventMap[eventName]);
    }
    for (const eventName in this.extRtcEventMap) {
      const listener = this.extRtcEventMap[eventName as ExtQNClientEventName];
      if (listener) {
        ExtQNClientEventListener.removeExtEventListener(
          <ExtQNClientEventName>eventName,
          listener as FunctionType
        );
      }
    }
  }

  /**
   * 启动前台转推, 默认实现推本地轨道
   */
  startForwardJob() {
    return this.rtcRoom?.rtcClient.startDirectLiveStreaming({
      videoTrack: this.rtcRoom?.localCameraTrack || undefined,
      audioTrack: this.rtcRoom?.localMicrophoneTrack || undefined,
      streamID: this.getStreamID(),
      url: this.getPushUri()
    });
  }

  /**
   * 停止前台推流
   */
  stopForwardJob() {
    return this.rtcRoom?.rtcClient.stopDirectLiveStreaming(
      this.getStreamID()
    );
  }

  /**
   * 启动混流
   */
  startMixStreamJob(config?: MixStreamJobConfig) {
    log.log('startMixStreamJob', {
      ...config,
      streamID: this.getStreamID(),
      url: this.getPushUri()
    });
    return this.rtcRoom?.rtcClient.startTranscodingLiveStreaming({
      ...config,
      streamID: this.getStreamID(),
      url: this.getPushUri()
    });
  }

  /**
   * 停止混流
   */
  stopMixStreamJob() {
    return this.rtcRoom?.rtcClient.stopTranscodingLiveStreaming(
      this.getStreamID(),
    );
  }

  /**
   * 更新用户摄像头混流参数
   * @param userId
   * @param option
   */
  updateUserCameraMergeOptions(userId: string, option?: MergeOption) {
    const trackId = this.rtcRoom?.getUserCameraTrack(userId)?.trackID;
    return this.updateUserMergeOptions({
      userId,
      trackId,
      option,
      tag: TAG_CAMERA
    });
  }

  /**
   * 更新用户麦克风混流参数
   * @param userId
   * @param isNeed
   */
  updateUserMicrophoneMergeOptions(userId: string, isNeed?: boolean) {
    const trackId = this.rtcRoom?.getUserMicrophoneTrack(userId)?.trackID;
    return this.updateUserMergeOptions({
      userId,
      trackId,
      option: isNeed ? transcodingLiveStreamingTrack : null,
      tag: TAG_MICROPHONE
    });
  }

  /**
   * 更新用户屏幕采集混流参数
   * @param userId
   * @param option
   */
  updateUserScreenMergeOptions(userId: string, option?: MergeOption) {
    log.log('updateUserScreenMergeOptions userId_option', userId, option);
    const trackId = this.rtcRoom?.getScreenTrackTool().getUserScreenTrack(userId)?.trackID;
    log.log('updateUserScreenMergeOptions trackId', trackId);
    return this.updateUserMergeOptions({
      userId,
      trackId,
      option,
      tag: TAG_SCREEN
    });
  }

  /**
   * 更新用户自定义视频混流参数
   * @param extraTrackTag
   * @param userId
   * @param option
   */
  updateUserCustomVideoMergeOptions(
    extraTrackTag: string,
    userId: string,
    option: MergeOption
  ) {
    const trackId = this.rtcRoom?.getCustomTrackTool().customTracks.find(
      track => track.tag === extraTrackTag
    )?.trackID;
    return this.updateUserMergeOptions({
      userId,
      trackId,
      option,
      tag: extraTrackTag
    });
  }

  /**
   * 更新用户自定义音频混流参数
   * @param extraTrackTag
   * @param userId
   * @param isNeed
   */
  updateUserCustomAudioMergeOptions(
    extraTrackTag: string,
    userId: string,
    isNeed: boolean
  ) {
    const trackId = this.rtcRoom?.getCustomTrackTool().customTracks.find(
      track => track.tag === extraTrackTag
    )?.trackID;
    return this.updateUserMergeOptions({
      userId,
      trackId,
      option: isNeed ? transcodingLiveStreamingTrack : null,
      tag: extraTrackTag
    });
  }

  /**
   * 更新混流参数
   * @param config
   */
  private updateUserMergeOptions(
    config: {
      userId: string,
      trackId?: string | null,
      option?: MergeOption | null,
      tag?: string
    }
  ) {
    const { userId, option, trackId, tag } = config;
    // 更新toDoCameraMergeOptionsMap
    const updateToDoCameraMergeOptionsMap = (
      userId: string,
      option?: MergeOption | null,
    ) => {
      if (option) {
        this.toDoCameraMergeOptionsMap.set(userId, option);
      } else {
        this.toDoCameraMergeOptionsMap.delete(userId);
      }
    };
    // 更新toDoMicrophoneMergeOptionsMap
    const updateToDoMicrophoneMergeOptionsMap = (
      userId: string,
      option?: MergeOption | null,
    ) => {
      if (option) {
        this.toDoMicrophoneMergeOptionsMap.set(userId, option);
      } else {
        this.toDoMicrophoneMergeOptionsMap.delete(userId);
      }
    };
    // 更新toDoScreenMergeOptionsMap
    const updateTodoScreenMergeOptionsMap = (
      userId: string,
      option?: MergeOption | null,
    ) => {
      if (option) {
        this.toDoScreenMergeOptionsMap.set(userId, option);
      } else {
        this.toDoScreenMergeOptionsMap.delete(userId);
      }
    };
    // 更新toDoCustomMergeOptionsMap
    const updateTodoCustomMergeOptionsMap = (
      userId: string,
      option?: MergeOption | null,
    ) => {
      if (option) {
        this.toDoCustomMergeOptionsMap.set(userId, option);
      } else {
        this.toDoCustomMergeOptionsMap.delete(userId);
      }
    };
    if (trackId) {
      if (option) {
        this.tracksMap.set(trackId, option);
        return this.resetOps();
      } else {
        this.tracksMap.delete(trackId);
        return this.resetOps();
      }
    } else {
      if (tag === TAG_CAMERA) return updateToDoCameraMergeOptionsMap(userId, option);
      if (tag === TAG_MICROPHONE) return updateToDoMicrophoneMergeOptionsMap(userId, option);
      if (tag === TAG_SCREEN) return updateTodoScreenMergeOptionsMap(userId, option);
      return updateTodoCustomMergeOptionsMap(userId, option);
    }
  }

  resetOps() {
    const mergeTrackOptions = Array.from(this.tracksMap).map(
      ([trackID, option]) => {
        return {
          trackID,
          ...option
        };
      }
    );
    log.log('resetOps', mergeTrackOptions);
    return this.rtcRoom?.rtcClient.setTranscodingLiveStreamingTracks(
      this.getStreamID() || null,
      mergeTrackOptions
    );
  }

  roomLeft() {
    this.unbindLiveStreamingListener();
    this.clear();
  }

  clear() {
    this.tracksMap.clear();
    this.toDoCameraMergeOptionsMap.clear();
    this.toDoMicrophoneMergeOptionsMap.clear();
    this.toDoScreenMergeOptionsMap.clear();
    this.toDoCustomMergeOptionsMap.clear();
  }
}


export default MixStreamTool;
