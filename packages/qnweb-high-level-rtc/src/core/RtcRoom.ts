import QNRTC, {
  QNCameraVideoTrack,
  QNCameraVideoTrackConfig,
  QNLocalTrack,
  QNMicrophoneAudioTrack,
  QNMicrophoneAudioTrackConfig,
  QNRemoteAudioTrack,
  QNRemoteTrack,
  QNRemoteVideoTrack,
  QNRTCClient, QNTrack,
} from 'qnweb-rtc';

import { ClientRoleType, RoomEntity, UserExtension } from '../types';
import CustomTrackTool from './CustomTrackTool';
import MixStreamTool from './MixStreamTool';
import PlayerTool from './PlayerTool';
import ScreenTrackTool from './ScreenTrackTool';
import { ExtQNClientEventListener, RtmManager, RoomManager } from '../event-bus';
import { LogModel, parseRoomToken } from '../util';
import { TAG_CAMERA, TAG_MICROPHONE } from '../constants';

const log = new LogModel('log');
log.setPreTitle('RTCRoom');

class RtcRoom {
  public roomEntity: null | RoomEntity = null;  // 房间实体
  public rtcClient: QNRTCClient = QNRTC.createClient(); // QNRTCClient
  public isJoined = false; // 是否已加入
  public localCameraParams?: QNCameraVideoTrackConfig; // 本地摄像头采集参数
  public localMicrophoneParams?: QNMicrophoneAudioTrackConfig; // 本地麦克风采集参数
  public localCameraTrack?: QNCameraVideoTrack | null; // 本地摄像头track
  public localMicrophoneTrack?: QNMicrophoneAudioTrack | null; // 本地麦克风track
  public localTracks: QNLocalTrack[] = []; // 本地所有的track
  public subscribedTracks: QNRemoteTrack[] = []; // 已订阅的track
  public clientRoleType: ClientRoleType = ClientRoleType.CLIENT_ROLE_AUDIENCE; // 客户端角色
  public screenTrackTool: ScreenTrackTool = new ScreenTrackTool(this); // 屏幕共享工具
  public customTrackTool: CustomTrackTool = new CustomTrackTool(this); // 自定义track工具
  public mixStreamTool: MixStreamTool = new MixStreamTool(this); // 混流工具
  public playerTool: PlayerTool = new PlayerTool(this); // 播放器工具
  public currentUserId = ''; // 当前用户id
  public currentUserExtension?: UserExtension | null; // 当前用户
  public QNRTCVersion: string = QNRTC.VERSION; // QNRTC版本
  public tag = '[RtcRoom]'; // 日志标签
  // 过滤掉远端指定的track类型
  // admin: 服务端
  public filteredTrackTypes: string[] = [];

  /**
   * 获取QNRTCClient
   */
  public getRtcClient() {
    return this.rtcClient;
  }

  /**
   * 获取rtmClient
   */
  public getRtmClient() {
    return RtmManager.getRtmAdapter();
  }

  /**
   * 设置用户角色
   * @param clientRoleType
   */
  public setClientRoleType(clientRoleType: ClientRoleType) {
    this.clientRoleType = clientRoleType;
    if (this.currentUserExtension) {
      this.currentUserExtension.clientRoleType = this.clientRoleType;
    }
  }

  /**
   * 加入房间
   * @param roomEntity 房间实体
   * @param userExtension
   */
  public joinRoom(roomEntity: RoomEntity, userExtension?: UserExtension) {
    const rtmClient = RtmManager.getRtmAdapter();
    this.roomEntity = roomEntity;
    this.currentUserId = parseRoomToken(roomEntity.roomToken || '').userId;
    this.currentUserExtension = {
      ...userExtension,
      uid: this.currentUserId,
      clientRoleType: this.clientRoleType,
    };
    RoomManager.setRoomEntity(
      this.roomEntity
    );
    const imGroupId = this.roomEntity.imGroupId;
    const roomToken = this.roomEntity.roomToken || '';
    if (rtmClient && imGroupId) {
      return rtmClient.joinChannel(imGroupId)
        .then((data: unknown) => {
          log.log('rtmClient.joinChannel', data);
          return this.joinRtcRoom(roomToken);
        })
        .then(() => {
          this.isJoined = true;
        });
    }
    return this.joinRtcRoom(roomToken).then(() => {
      this.isJoined = true;
    });
  }

  /**
   * 离开房间
   * 销毁本地的track
   */
  public leaveRoom() {
    ExtQNClientEventListener.dispatchExtEventListener('roomLeft');
    const rtmClient = RtmManager.getRtmAdapter();
    const imGroupId = this.roomEntity?.imGroupId;
    this.clear();
    if (rtmClient && imGroupId) {
      return rtmClient.leaveChannel(imGroupId)
        .then(() => this.leaveRtcRoom())
        .then(() => {
          this.isJoined = false;
        });
    }
    return this.leaveRtcRoom().then(() => {
      this.isJoined = false;
    });
  }

  /**
   * 设置摄像头采集参数
   * @param config
   */
  public setUpLocalCameraParams(config?: QNCameraVideoTrackConfig) {
    this.localCameraParams = {
      tag: TAG_CAMERA,
      ...config
    };
  }

  /**
   * 设置麦克风采集参数
   * @param config
   */
  public setUpLocalMicrophoneParams(config?: QNMicrophoneAudioTrackConfig) {
    this.localMicrophoneParams = {
      tag: TAG_MICROPHONE,
      ...config
    };
  }

  /**
   * 采集本地摄像头/采集并发布本地摄像头
   */
  public enableCamera() {
    if (!this.localCameraParams) this.setUpLocalCameraParams(this.localCameraParams);
    return QNRTC.createCameraVideoTrack(this.localCameraParams).then(track => {
      this.localCameraTrack = track;
      this.localTracks = this.localTracks.concat(this.localCameraTrack);
      if (this.isJoined) {
        return this.rtcClient.publish(track).then(() => {
          ExtQNClientEventListener.dispatchExtEventListener(
            'localPublished',
            [track]
          );
        });
      }
    });
  }

  /**
   * 采集本地麦克风/采集并发布本地麦克风
   */
  public enableMicrophone() {
    if (!this.localMicrophoneParams) this.setUpLocalMicrophoneParams(this.localMicrophoneParams);
    return QNRTC.createMicrophoneAudioTrack(this.localMicrophoneParams).then(track => {
      this.localMicrophoneTrack = track;
      this.localTracks = this.localTracks.concat(this.localMicrophoneTrack);
      if (this.isJoined) {
        return this.rtcClient.publish(track).then(() => {
          ExtQNClientEventListener.dispatchExtEventListener(
            'localPublished',
            [track]
          );
        });
      }
    });
  }

  /**
   * 取消发布本地摄像头
   */
  public disableCamera() {
    if (this.isJoined && this.localCameraTrack) {
      return this.rtcClient.unpublish(
        this.localCameraTrack
      ).then(() => {
        ExtQNClientEventListener.dispatchExtEventListener(
          'localUnPublished',
          [this.localCameraTrack]
        );
        this.localTracks = this.localTracks.filter(
          track => track.trackID !== this.localCameraTrack?.trackID
        );
        this.localCameraTrack = null;
      });
    }
  }

  /**
   * 取消发布本地麦克风
   */
  public disableMicrophone() {
    if (this.isJoined && this.localMicrophoneTrack) {
      return this.rtcClient.unpublish(
        this.localMicrophoneTrack
      ).then(() => {
        ExtQNClientEventListener.dispatchExtEventListener(
          'localUnPublished',
          [this.localMicrophoneTrack]
        );
        this.localTracks = this.localTracks.filter(
          track => track.trackID !== this.localMicrophoneTrack?.trackID
        );
        this.localMicrophoneTrack = null;
      });
    }
  }

  /**
   * 开关摄像头
   * @param muted true-关闭、false-开启
   */
  public muteLocalCamera(muted: boolean) {
    if (this.localCameraTrack) {
      this.localCameraTrack.setMuted(muted);
    }
  }

  /**
   * 开关麦克风
   * @param muted true-关闭、false-开启
   */
  public muteLocalMicrophone(muted: boolean) {
    if (this.localMicrophoneTrack) {
      this.localMicrophoneTrack.setMuted(muted);
    }
  }

  /**
   * 屏蔽/不屏蔽远端某人的摄像头
   * @param userId 用户id
   * @param muted true-关闭、false-开启
   */
  public muteRemoteCamera(userId: string, muted: boolean) {
    const user = this.rtcClient.remoteUsers.find(
      user => user.userID === userId
    );
    const tracks = user?.getVideoTracks().filter(
      track => track.tag === TAG_CAMERA
    );
    if (!tracks?.length) {
      return Promise.reject(
        new TypeError(
          `muteRemoteCamera error, user: ${userId} does not have camera track`
        )
      );
    }
    return muted ? this.rtcClient.unsubscribe(
      tracks
    ) : this.rtcClient.subscribe(
      tracks
    );
  }

  /**
   * 屏蔽/不屏蔽远端某人的麦克风
   * @param userId 用户id
   * @param muted true-关闭、false-开启
   */
  public muteRemoteMicrophone(userId: string, muted: boolean) {
    const user = this.rtcClient.remoteUsers.find(
      user => user.userID === userId
    );
    const tracks = user?.getAudioTracks().filter(
      track => track.tag === TAG_MICROPHONE
    );
    if (!tracks?.length) {
      return Promise.reject(
        new TypeError(
          `muteRemoteMicrophone error, user: ${userId} does not have microphone track`
        )
      );
    }
    return muted ? this.rtcClient.unsubscribe(
      tracks
    ) : this.rtcClient.subscribe(
      tracks
    );
  }

  /**
   * 屏蔽/不屏蔽远端所有摄像头
   * @param muted true-关闭、false-开启
   */
  public muteAllRemoteCamera(muted: boolean) {
    const tracks = this.rtcClient.remoteUsers.reduce<QNRemoteVideoTrack[]>(
      (previousValue, currentValue) => {
        return previousValue.concat(
          currentValue.getVideoTracks().filter(
            track => track.tag === TAG_CAMERA
          )
        );
      }, []
    );
    return muted ? this.rtcClient.unsubscribe(
      tracks
    ) : this.rtcClient.subscribe(
      tracks
    );
  }

  /**
   * 屏蔽/不屏蔽远端所有麦克风
   * @param muted true-关闭、false-开启
   */
  public muteAllRemoteMicrophone(muted: boolean) {
    const tracks = this.rtcClient.remoteUsers.reduce<QNRemoteAudioTrack[]>(
      (previousValue, currentValue) => {
        return previousValue.concat(
          currentValue.getAudioTracks().filter(
            track => track.tag === TAG_MICROPHONE
          )
        );
      }, []
    );
    return muted ? this.rtcClient.unsubscribe(
      tracks
    ) : this.rtcClient.subscribe(
      tracks
    );
  }

  /**
   * 设置本地摄像头预览窗口
   * @param elementId 元素id
   */
  public setLocalCameraWindowView(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      return Promise.reject(
        new Error(`setLocalCameraWindowView error, elementId ${elementId} not found`)
      );
    }
    log.log('setLocalCameraWindowView', this.localCameraTrack);
    return this.localCameraTrack?.play(element);
  }

  /**
   * 设置本地麦克风预览窗口
   * @param elementId 元素id
   */
  public setLocalMicrophoneWindowView(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      return Promise.reject(
        new Error(`setLocalMicrophoneWindowView error, elementId ${elementId} not found`)
      );
    }
    log.log('setLocalMicrophoneWindowView', this.localMicrophoneTrack);
    return this.localMicrophoneTrack?.play(element);
  }

  /**
   * 设置远端某个用户摄像头预览窗口
   * @param userId 用户id
   * @param elementId 元素id
   */
  public setUserCameraWindowView(userId: string, elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      return Promise.resolve(
        new Error(`setUserCameraWindowView error, elementId ${elementId} not found`)
      );
    }
    const track = [
      ...this.subscribedTracks,
      ...this.localTracks
    ].find(
      track => track.tag === TAG_CAMERA &&
        track.userID === userId
    );
    log.log('setUserCameraWindowView', userId, track);
    return track?.play(element);
  }

  /**
   * 设置远端某个用户麦克风预览窗口
   * @param userId 用户id
   * @param elementId 元素id
   */
  public setUserMicrophoneWindowView(userId: string, elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      return Promise.reject(
        new Error(`setUserMicrophoneWindowView error, elementId ${elementId} not found`)
      );
    }
    const track = [
      ...this.subscribedTracks,
      ...this.localTracks
    ].find(
      track => track.tag === TAG_MICROPHONE &&
        track.userID === userId
    );
    log.log('setUserMicrophoneWindowView', userId, track);
    return track?.play(element);
  }

  /**
   * 获取用户摄像头track
   * @param userId
   */
  public getUserCameraTrack(userId: string) {
    return [
      ...this.subscribedTracks,
      ...this.localTracks
    ].find(
      track => track.tag === TAG_CAMERA &&
        track.userID === userId
    );
  }

  /**
   * 获取用户麦克风track
   * @param userId
   */
  public getUserMicrophoneTrack(userId: string) {
    return [
      ...this.subscribedTracks,
      ...this.localTracks
    ].find(
      track => track.tag === TAG_MICROPHONE &&
        track.userID === userId
    );
  }

  public getScreenTrackTool() {
    return this.screenTrackTool;
  }

  public getCustomTrackTool() {
    return this.customTrackTool;
  }

  public getMixStreamTool() {
    return this.mixStreamTool;
  }

  public getPlayerTool() {
    return this.playerTool;
  }

  /**
   * 清理
   * @private
   */
  private clear() {
    this.localTracks.forEach(track => {
      track.destroy();
    });
    this.localTracks = [];
    this.subscribedTracks = [];
    this.localCameraTrack = null;
    this.localMicrophoneTrack = null;
    this.localCameraParams = undefined;
    this.localMicrophoneParams = undefined;
  }

  /**
   * 区分用户角色加入rtc房间
   * @param roomToken
   * @private
   */
  private joinRtcRoom(roomToken: string) {
    if (this.clientRoleType === ClientRoleType.CLIENT_ROLE_PULLER) {
      log.log('拉流角色TODO');
      return Promise.resolve();
    }
    return this.rtcClient.join(
      roomToken,
      JSON.stringify(this.currentUserExtension)
    );
  }

  /**
   * 区分用户角色离开rtc房间
   * @private
   */
  private leaveRtcRoom() {
    if (this.clientRoleType === ClientRoleType.CLIENT_ROLE_PULLER) {
      log.log('拉流角色TODO');
      return Promise.resolve();
    }
    return this.rtcClient.leave();
  }

  /**
   * 更新过滤掉远端指定的track类型
   * @param trackTypes
   */
  setFilteredTrackTypes(trackTypes: string[]) {
    this.filteredTrackTypes = trackTypes;
  }

  /**
   * 获取需要订阅的track
   * @param remoteTracks
   * @protected
   */
  protected getSubscribeTracks(remoteTracks: QNRemoteTrack[]) {
    const isAdminTrack = (track: QNTrack) => {
      return track.userID?.startsWith('admin');
    };
    return remoteTracks.reduce<QNRemoteTrack[]>((tracks, remoteTrack) => {
      if (
        this.filteredTrackTypes.includes('admin') &&
        isAdminTrack(remoteTrack)
      ) {
        return tracks;
      }
      return tracks.concat(remoteTrack);
    }, []);
  }
}

export default RtcRoom;
