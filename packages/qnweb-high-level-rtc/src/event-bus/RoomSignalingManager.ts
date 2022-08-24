import RtmManager from './RtmManager';
import {
  CameraMicStatusSignaling,
  ScreenMicSeat,
  ScreenSignaling,
  SitDownUpSignaling, UserExtension,
  UserJoinSignaling,
  UserMicSeat
} from '../types';
import RoomManager from './RoomManager';
import { addTimeStamp, LogModel } from '../util';

const log = new LogModel('log');
log.setPreTitle('RoomSignalingManager');

class RoomSignalingManager {
  public tag = 'RoomSignalingManager';

  getImGroupId() {
    return RoomManager.getRoomEntity()?.imGroupId || '';
  }

  /**
   * 发送上麦信令
   * @param data
   */
  sendUserSitDown(data: UserMicSeat) {
    const signaling: SitDownUpSignaling = {
      action: 'rtc_sitDown',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    log.log('RtmManager.getRtmAdapter()', RtmManager.getRtmAdapter());
    log.log('getImGroupId', this.getImGroupId());
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 发送下麦信令
   * @param data
   */
  sendUserSitUp(data: UserMicSeat) {
    const signaling: SitDownUpSignaling = {
      action: 'rtc_sitUp',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 发送摄像头切换信令
   * @param data
   */
  sendUserCameraStatusChange(data: UserMicSeat) {
    const signaling: CameraMicStatusSignaling = {
      action: 'rtc_cameraStatus',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 发送麦克风切换信令
   * @param data
   */
  sendUserMicrophoneStatusChange(data: UserMicSeat) {
    const signaling: CameraMicStatusSignaling = {
      action: 'rtc_microphoneStatus',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 发送屏幕采集开启信令
   * @param data
   */
  sendUserPubScreen(data: ScreenMicSeat) {
    const signaling: ScreenSignaling = {
      action: 'rtc_pubScreen',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 发送屏幕采集关闭信令
   * @param data
   */
  sendUserUnPubScreen(data: ScreenMicSeat) {
    const signaling: ScreenSignaling = {
      action: 'rtc_unPubScreen',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 发送用户进入房间信令
   * @param data
   */
  sendUserJoin(data: UserExtension) {
    const signaling: UserJoinSignaling = {
      action: 'rtc_userJoin',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 发送用户离开房间信令
   * @param data
   */
  sendUserLeft(data: UserExtension) {
    const signaling: UserJoinSignaling = {
      action: 'rtc_userLeft',
      data: addTimeStamp(data),
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 禁止开麦克风
   * @param data
   */
  forbiddenMicSeatAudio(data: {
    uid: string;
    isForbidden: boolean;
    msg: string
  }) {
    const signaling = {
      action: 'rtc_forbiddenAudio',
      data
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }

  /**
   * 禁止开摄像头
   * @param data
   */
  forbiddenMicSeatVideo(data: {
    uid: string;
    isForbidden: boolean;
    msg: string
  }) {
    const signaling = {
      action: 'rtc_forbiddenVideo',
      data
    };
    const msg = JSON.stringify(signaling);
    return RtmManager.getRtmAdapter()?.sendChannelMsg(
      msg,
      this.getImGroupId(),
      true
    );
  }
}

export default new RoomSignalingManager();
