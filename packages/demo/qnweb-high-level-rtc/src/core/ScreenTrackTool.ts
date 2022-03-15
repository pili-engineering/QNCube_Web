import RtcRoom from './RtcRoom';
import QNRTC, {
  QNRemoteAudioTrack,
  QNRemoteTrack,
  QNRemoteVideoTrack,
  QNScreenVideoTrack,
  QNScreenVideoTrackConfig
} from 'qnweb-rtc';
import { ClientRoleType, ScreenMicSeat, ScreenMicSeatListener } from '../types';
import ExtQNClientEventListener from '../event-bus/ExtQNClientEventListener';
import { TAG_SCREEN } from '../constants';
import { LogModel } from '../util';

const log = new LogModel('log');
log.setPreTitle('ScreenTrackTool')

/**
 * 屏幕共享
 */
class ScreenTrackTool {
  public rtcRoom: RtcRoom;
  public tag: string = '[ScreenTrackTool]';

  // 本地屏幕采集参数
  public localScreenParams?: QNScreenVideoTrackConfig;
  // 本地屏幕采集track
  public localScreenTrack?: QNScreenVideoTrack | null;
  // 屏幕共享麦位
  public screenMicSeats: ScreenMicSeat[] = [];
  // 屏幕共享麦位事件监听
  public screenMicSeatListeners: ScreenMicSeatListener[];

  constructor(rtcRoom: RtcRoom) {
    this.rtcRoom = rtcRoom;
    this.handleRtcUserPublished = this.handleRtcUserPublished.bind(this);
    this.handleRtcUserUnpublished = this.handleRtcUserUnpublished.bind(this);
    this.rtcRoom.rtcClient.on('user-published', this.handleRtcUserPublished);
    this.rtcRoom.rtcClient.on('user-unpublished', this.handleRtcUserUnpublished);
    this.screenMicSeatListeners = [];
  }

  clear() {
    this.screenMicSeats = [];
    this.localScreenTrack = null;
    this.localScreenParams = undefined;
    this.rtcRoom.rtcClient.off('user-published', this.handleRtcUserPublished);
    this.rtcRoom.rtcClient.off('user-unpublished', this.handleRtcUserUnpublished);
  }

  /**
   * 添加屏幕共享麦位监听
   * @param listener
   */
  addScreenMicSeatListener(listener: ScreenMicSeatListener) {
    this.screenMicSeatListeners = this.screenMicSeatListeners.concat(listener);
  }

  /**
   * 移除屏幕共享麦位监听
   * @param listener
   */
  removeScreenMicSeatListener(listener: ScreenMicSeatListener) {
    this.screenMicSeatListeners = this.screenMicSeatListeners.filter(
      item => item !== listener
    );
  }

  /**
   * 用户发布track
   * @param userID
   * @param tracks
   */
  handleRtcUserPublished(
    userID: string,
    tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]
  ) {
    log.log('handleRtcUserPublished', userID, tracks)
    const screenTracks = tracks.filter(
      track => track.tag === TAG_SCREEN
    );
    if (screenTracks.length) {
      this.rtcRoom.rtcClient.subscribe(screenTracks).then(() => {
        // 更新订阅的track
        this.rtcRoom.subscribedTracks = this.rtcRoom.subscribedTracks.concat(
          screenTracks
        );
        // 用户上麦
        screenTracks.forEach(track => {
          this.userSitDown(track.userID as string);
        })
      });
    }
  }

  /**
   * 用户取消发布track
   * @param userID
   * @param tracks
   */
  handleRtcUserUnpublished(
    userID: string,
    tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]
  ) {
    log.log('handleRtcUserUnpublished', userID, tracks);
    const screenTracks = tracks.filter(
      track => track.tag === TAG_SCREEN
    );
    // 更新订阅流
    this.rtcRoom.subscribedTracks = this.rtcRoom.subscribedTracks.filter(
      subscribedTrack => tracks.every(
        track => track.trackID !== subscribedTrack.trackID
      )
    );
    // 用户下麦
    screenTracks.forEach(track => {
      this.userSitUp(track.userID as string);
    })
  }


  /**
   * 设置屏幕采集参数
   * @param config
   */
  setUpLocalScreenParams(config?: QNScreenVideoTrackConfig) {
    this.localScreenParams = {
      screenVideoTag: TAG_SCREEN,
      ...config
    };
  }

  /**
   * 采集本地屏幕/采集并发布本地屏幕
   * 未在房间内只采集本地track, 在房间内采集并发布本地track
   * 角色只限制发布track，目的是为了兼容设备检测时采集摄像头
   */
  enableScreen() {
    if (!this.localScreenParams) this.setUpLocalScreenParams(this.localScreenParams);
    return QNRTC.createScreenVideoTrack(this.localScreenParams).then(track => {
      const tracks = Array().concat(track);
      this.localScreenTrack = tracks.find(itemTrack => itemTrack.tag === TAG_SCREEN) as QNScreenVideoTrack;
      this.rtcRoom.localTracks = this.rtcRoom.localTracks.concat(this.localScreenTrack);
      if (this.rtcRoom?.isJoined && this.rtcRoom?.clientRoleType === ClientRoleType.CLIENT_ROLE_BROADCASTER) {
        return this.rtcRoom.rtcClient.publish(this.localScreenTrack).then(() => {
          this.userSitDown(this.rtcRoom.currentUserId);
          ExtQNClientEventListener.dispatchExtEventListener(
            'localPublished',
            [this.localScreenTrack]
          );
        });
      }
      return Promise.reject('当前用户角色为: ' + this.rtcRoom.clientRoleType + ', 无法发布本地屏幕轨道');
    });
  }

  /**
   * 取消发布本地屏幕
   */
  disableScreen() {
    if (this.rtcRoom?.isJoined && this.localScreenTrack) {
      return this.rtcRoom.rtcClient.unpublish(
        this.localScreenTrack
      ).then(() => {
        this.userSitUp(this.rtcRoom.currentUserId);
        ExtQNClientEventListener.dispatchExtEventListener(
          'localUnPublished',
          this.localScreenTrack
        );
        this.rtcRoom.localTracks = this.rtcRoom.localTracks.filter(
          track => track.trackID !== this.localScreenTrack?.trackID
        );
        this.localScreenTrack = null;
      });
    }
  }

  /**
   * 用户上麦
   * @param userID
   * @private
   */
  private userSitDown(userID: string) {
    const isOnMic = this.screenMicSeats.some(
      s => s.uid === userID
    );
    if (!isOnMic) {
      this.screenMicSeats = this.screenMicSeats.concat({
        uid: userID,
        isScreenOpen: true,
        isMySeat: userID === this.rtcRoom.currentUserId
      });
    }
    const noticeMicSeat = this.screenMicSeats.find(
      s => s.uid === userID
    )
    if (noticeMicSeat) {
      this.screenMicSeatListeners.forEach(
        listener => listener.onScreenMicSeatAdd?.(noticeMicSeat)
      )
    }
  }

  /**
   * 用户下麦
   * @param userID
   * @private
   */
  private userSitUp(userID: string) {
    this.screenMicSeats = this.screenMicSeats.filter(
      s => s.uid !== userID
    );
    const noticeMicSeat = this.screenMicSeats.find(
      s => s.uid === userID
    )
    if (noticeMicSeat) {
      this.screenMicSeatListeners.forEach(
        listener => listener.onScreenMicSeatAdd?.(noticeMicSeat)
      )
    }
  }

  /**
   * mute 屏幕
   * @param muted true-关闭、false-开启
   */
  muteLocalScreen(muted: boolean) {
    if (this.localScreenTrack) {
      this.localScreenTrack.setMuted(muted);
    }
  }

  /**
   * 设置本地屏幕预览窗口
   * @param elementId 元素id
   */
  setLocalScreenWindowView(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`setLocalScreenWindowView error, elementId ${elementId} not found`);
    }
    log.log('setLocalScreenWindowView', this.localScreenTrack);
    return this.localScreenTrack?.play(element);
  }

  /**
   * 获取用户麦克风track
   * @param userID
   */
  getUserScreenTrack(userID: string) {
    return [
      ...this.rtcRoom.subscribedTracks,
      ...this.rtcRoom.localTracks
    ].find(
      track => track.tag === TAG_SCREEN &&
        track.userID === userID
    );
  }

  /**
   * 屏蔽/不屏蔽远端某人的屏幕采集
   * @param userID
   * @param muted true-关闭、false-开启
   */
  muteRemoteScreen(userID: string, muted: boolean) {
    const user = this.rtcRoom.rtcClient.remoteUsers.find(
      user => user.userID === userID
    );
    const tracks = [
      ...(user?.getVideoTracks() || []),
      ...(user?.getAudioTracks() || [])
    ].filter(
      track => track.tag?.startsWith(TAG_SCREEN)
    );
    if (!tracks?.length) {
      throw new TypeError(
        `muteRemoteScreen error, user: ${userID} does not have microphone track`
      );
    }
    return muted ? this.rtcRoom.rtcClient.unsubscribe(
      tracks
    ) : this.rtcRoom.rtcClient.subscribe(
      tracks
    );
  }

  /**
   * 屏蔽/不屏蔽远端所有屏幕采集
   * @param muted true-关闭、false-开启
   */
  muteAllRemoteScreen(muted: boolean) {
    const tracks = this.rtcRoom.rtcClient.remoteUsers.reduce<QNRemoteTrack[]>(
      (previousValue, currentValue) => {
        return previousValue.concat(
          currentValue.getVideoTracks().filter(
            track => track.tag === TAG_SCREEN
          )
        );
      }, []
    );
    return muted ? this.rtcRoom.rtcClient.unsubscribe(
      tracks
    ) : this.rtcRoom.rtcClient.subscribe(
      tracks
    );
  }

  /**
   * 设置远端某个用户屏幕预览窗口
   * @param userID 用户id
   * @param elementId 元素id
   */
  setUserScreenWindowView(userID: string, elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`setUserScreenWindowView error, elementId ${elementId} not found`);
    }
    const track = [
      ...this.rtcRoom.subscribedTracks,
      ...this.rtcRoom.localTracks
    ].find(
      trackItem => trackItem.tag === TAG_SCREEN &&
        trackItem.userID === userID
    );
    log.log('setUserScreenWindowView', userID, track);
    return track?.play(element);
  }
}

export default ScreenTrackTool;
