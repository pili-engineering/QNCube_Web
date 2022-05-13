import RtcRoom from './RtcRoom';
import {
  CameraMicStatusSignaling,
  ClientRoleType,
  MicSeatListener,
  RoomEntity,
  SitDownUpSignaling,
  UserExtension,
  UserMicSeat
} from '../types';
import {
  QNConnectionDisconnectedInfo,
  QNConnectionState,
  QNCustomMessage,
  QNLiveStreamingState,
  QNRemoteAudioTrack,
  QNRemoteTrack,
  QNRemoteVideoTrack
} from 'qnweb-rtc';
import RoomSignalingManager from '../event-bus/RoomSignalingManager';
import RtmManager from '../event-bus/RtmManager';
import { TAG_CAMERA, TAG_MICROPHONE } from '../constants';
import { LogModel } from '../util';

const log = new LogModel('log');
log.setPreTitle('MutableTrackRoom')

export interface MutableTrackRoomSeat extends UserMicSeat {
  isMuteVideoByMe?: boolean,
  isMuteAudioByMe?: boolean,
}

class MutableTrackRoom extends RtcRoom {
  public mMicSeats: MutableTrackRoomSeat[] = []; // 麦位列表
  public micSeatListeners: MicSeatListener<MutableTrackRoomSeat>[] = []; // 麦位监听器
  public tag = '[MutableTrackRoom]'; // 日志标签
  constructor() {
    super();
    this.handleRtcUserJoined = this.handleRtcUserJoined.bind(this); // 用户加入房间
    this.handleRtcUserLeft = this.handleRtcUserLeft.bind(this); // 用户发布 track
    this.handleRtcUserPublished = this.handleRtcUserPublished.bind(this); // 用户取消发布 track
    this.handleRtcUserUnpublished = this.handleRtcUserUnpublished.bind(this); // 与房间的连接状态改变
    this.handleRtcConnectionStateChanged = this.handleRtcConnectionStateChanged.bind(this); // 收到自定义消息
    this.handleRtcMessageReceived = this.handleRtcMessageReceived.bind(this); // 远端用户重连中
    this.handleRtcUserReconnecting = this.handleRtcUserReconnecting.bind(this); // 远端用户重连成功
    this.handleRtcUserReconnected = this.handleRtcUserReconnected.bind(this); // 单路转推状态变化
    this.handleRtcDirectLivestreamingStateChanged = this.handleRtcDirectLivestreamingStateChanged.bind(this); // 单路转推状态变化
    this.handleRtcTranscodingLivestreamingStateChanged = this.handleRtcTranscodingLivestreamingStateChanged.bind(this); // 合流转推状态变化
    this.handleRtmMessageReceived = this.handleRtmMessageReceived.bind(this); // im消息
    this.bindEvents();
  }

  /**
   * 添加麦位事件监听
   * @param listener
   */
  public addMicSeatListener(listener: MicSeatListener<MutableTrackRoomSeat>) {
    this.micSeatListeners = this.micSeatListeners.concat(listener);
  }

  /**
   * 移除事件监听
   * @param listener
   */
  public removeMicSeatListener(listener: MicSeatListener<MutableTrackRoomSeat>) {
    this.micSeatListeners = this.micSeatListeners.filter(
      mListener => mListener !== listener
    );
  }

  /**
   * 初始化同步麦位
   * @param mMicSeats
   */
  public userClientTypeSyncMicSeats(mMicSeats: MutableTrackRoomSeat[]) {
    this.mMicSeats = mMicSeats;
  }

  /**
   * 切换角色
   * @param clientRoleType
   */
  public setClientRoleType(clientRoleType: ClientRoleType) {
    super.setClientRoleType(clientRoleType);
  }

  /**
   * 加入房间
   * 主播角色: 加入房间+上麦
   * 其他角色: 离开房间
   * @param roomEntity
   * @param userExtension
   */
  public joinRoom(roomEntity: RoomEntity, userExtension?: UserExtension): Promise<void> {
    return super.joinRoom(roomEntity, userExtension).then(() => {
      RoomSignalingManager.sendUserJoin({
        uid: this.currentUserId,
        ...this.currentUserExtension
      });
      if (this.clientRoleType === ClientRoleType.CLIENT_ROLE_BROADCASTER) {
        this.userSitDown(
          this.currentUserId,
          this.currentUserExtension
        );
        const currentMicSeat = this.getMicSeatByUid(this.currentUserId);
        if (currentMicSeat) {
          RoomSignalingManager.sendUserSitDown(
            currentMicSeat
          );
        }
      }
      // this.initRemoteMicSeats();
    });
  }

  /**
   * 离开房间
   * 主播角色: 离开房间+下麦
   * 其他角色: 离开房间
   */
  public leaveRoom() {
    RoomSignalingManager.sendUserLeft({
      uid: this.currentUserId,
      ...this.currentUserExtension
    });
    if (this.clientRoleType === ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      const currentMicSeat = this.getMicSeatByUid(this.currentUserId);
      if (currentMicSeat) {
        RoomSignalingManager.sendUserSitUp(currentMicSeat);
      }
    }
    log.log('leaveRoom');
    return super.leaveRoom().then(() => {
      log.log('leaveRoom Successfully', this.clientRoleType);
      this.mMicSeats = [];
      this.currentUserId = '';
      this.currentUserExtension = undefined;
      // this.unbindEvents();
    });
  }

  /**
   * 开启摄像头
   * 主播角色: 开启摄像头+发布
   * 有人打开摄像头则触发打开摄像头回调
   */
  public enableCamera(): Promise<void> {
    if (this.clientRoleType !== ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      return Promise.reject('No permission');
    }
    return super.enableCamera().then(() => {
      this.userCameraStatusChanged(this.currentUserId, true);
      const userMicSeat = this.getMicSeatByUid(this.currentUserId);
      if (userMicSeat) {
        RoomSignalingManager.sendUserCameraStatusChange(
          userMicSeat,
        );
      }
    });
  }

  /**
   * 关闭摄像头
   * 有人关闭摄像头则触发关闭摄像头回调
   */
  public disableCamera(): Promise<void> {
    if (this.clientRoleType !== ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      return Promise.reject('No permission');
    }
    return Promise.resolve(super.disableCamera()).then(() => {
      this.userCameraStatusChanged(this.currentUserId, false);
      const userMicSeat = this.getMicSeatByUid(this.currentUserId);
      if (userMicSeat) {
        RoomSignalingManager.sendUserCameraStatusChange(
          userMicSeat,
        );
      }
    });
  }

  /**
   * 开启麦克风
   * 有人打开麦克风则触发打开麦克风回调
   */
  public enableMicrophone(): Promise<void> {
    if (this.clientRoleType !== ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      return Promise.reject('No permission');
    }
    return super.enableMicrophone().then(() => {
      this.userMicrophoneStatusChanged(this.currentUserId, true);
      const userMicSeat = this.getMicSeatByUid(this.currentUserId);
      if (userMicSeat) {
        RoomSignalingManager.sendUserMicrophoneStatusChange(
          userMicSeat,
        );
      }
    });
  }

  /**
   * 关闭麦克风
   * 有人关闭麦克风则触发关闭麦克风回调
   */
  public disableMicrophone(): Promise<void> {
    if (this.clientRoleType !== ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      return Promise.reject('No permission');
    }
    return Promise.resolve(super.disableMicrophone()).then(() => {
      this.userMicrophoneStatusChanged(this.currentUserId, false);
      const userMicSeat = this.getMicSeatByUid(this.currentUserId);
      if (userMicSeat) {
        RoomSignalingManager.sendUserMicrophoneStatusChange(
          userMicSeat,
        );
      }
    });
  }

  /**
   * mute摄像头
   * @param muted
   */
  public muteLocalCamera(muted: boolean) {
    if (this.clientRoleType !== ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      throw new TypeError('No permission');
    }
    super.muteLocalCamera(muted);
    this.userCameraStatusChanged(this.currentUserId, !muted);
    const userMicSeat = this.getMicSeatByUid(this.currentUserId);
    if (userMicSeat) {
      RoomSignalingManager.sendUserCameraStatusChange({
        ...userMicSeat,
        isOwnerOpenVideo: !muted,
      });
    }
  }

  /**
   * mute麦克风
   * @param muted
   */
  public muteLocalMicrophone(muted: boolean) {
    if (this.clientRoleType !== ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      throw new TypeError('No permission');
    }
    super.muteLocalMicrophone(muted);
    this.userMicrophoneStatusChanged(this.currentUserId, !muted);
    const userMicSeat = this.getMicSeatByUid(this.currentUserId);
    if (userMicSeat) {
      RoomSignalingManager.sendUserMicrophoneStatusChange({
        ...userMicSeat,
        isOwnerOpenAudio: !muted,
      });
    }
  }

  /**
   * mute远端摄像头
   * @param userId
   * @param muted
   */
  public muteRemoteCamera(userId: string, muted: boolean) {
    return super.muteRemoteCamera(userId, muted).then(() => {
      this.userCameraStatusChanged(userId, !muted);
      const userMicSeat = this.getMicSeatByUid(userId);
      if (userMicSeat) {
        RoomSignalingManager.sendUserCameraStatusChange(
          userMicSeat,
        );
      }
    });
  }

  /**
   * mute远端麦克风
   * @param userId
   * @param muted
   */
  public muteRemoteMicrophone(userId: string, muted: boolean) {
    return super.muteRemoteMicrophone(userId, muted).then(() => {
      this.userMicrophoneStatusChanged(userId, !muted);
      const userMicSeat = this.getMicSeatByUid(userId);
      if (userMicSeat) {
        RoomSignalingManager.sendUserMicrophoneStatusChange(
          userMicSeat,
        );
      }
    });
  }

  /**
   * mute远端所有摄像头
   * @param muted
   */
  public muteAllRemoteCamera(muted: boolean) {
    return super.muteAllRemoteCamera(muted).then(() => {
      this.mMicSeats.forEach(mMicSeat => {
        this.userCameraStatusChanged(mMicSeat.uid, !muted);
        const userMicSeat = this.getMicSeatByUid(mMicSeat.uid);
        if (userMicSeat) {
          RoomSignalingManager.sendUserCameraStatusChange(
            userMicSeat,
          );
        }
      });
    });
  }

  /**
   * mute远端所有麦克风
   * @param muted
   */
  public muteAllRemoteMicrophone(muted: boolean) {
    return super.muteAllRemoteMicrophone(muted).then(() => {
      this.mMicSeats.forEach(mMicSeat => {
        this.userMicrophoneStatusChanged(mMicSeat.uid, !muted);
        const userMicSeat = this.getMicSeatByUid(mMicSeat.uid);
        if (userMicSeat) {
          RoomSignalingManager.sendUserMicrophoneStatusChange(
            userMicSeat,
          );
        }
      });
    });
  }

  /**
   * 注册事件监听
   * @link https://developer.qiniu.com/rtc/9246/WEB%20API%20%E6%A6%82%E8%A7%88
   */
  private bindEvents() {
    this.rtcClient.on('user-joined', this.handleRtcUserJoined);
    this.rtcClient.on('user-left', this.handleRtcUserLeft);
    this.rtcClient.on('user-published', this.handleRtcUserPublished);
    this.rtcClient.on('user-unpublished', this.handleRtcUserUnpublished);
    this.rtcClient.on('connection-state-changed', this.handleRtcConnectionStateChanged);
    this.rtcClient.on('message-received', this.handleRtcMessageReceived);
    this.rtcClient.on('user-reconnecting', this.handleRtcUserReconnecting);
    this.rtcClient.on('user-reconnected', this.handleRtcUserReconnected);
    this.rtcClient.on('direct-livestreaming-state-changed', this.handleRtcDirectLivestreamingStateChanged);
    this.rtcClient.on('transcoding-livestreaming-state-changed', this.handleRtcTranscodingLivestreamingStateChanged);
    RtmManager.addRtmChannelListener(
      this.handleRtmMessageReceived,
    );
  }

  /**
   * 解绑事件监听
   * @link https://developer.qiniu.com/rtc/9246/WEB%20API%20%E6%A6%82%E8%A7%88
   */
  private unbindEvents() {
    this.rtcClient.off('user-joined', this.handleRtcUserJoined);
    this.rtcClient.off('user-left', this.handleRtcUserLeft);
    this.rtcClient.off('user-published', this.handleRtcUserPublished);
    this.rtcClient.off('user-unpublished', this.handleRtcUserUnpublished);
    this.rtcClient.off('connection-state-changed', this.handleRtcConnectionStateChanged);
    this.rtcClient.off('message-received', this.handleRtcMessageReceived);
    this.rtcClient.off('user-reconnecting', this.handleRtcUserReconnecting);
    this.rtcClient.off('user-reconnected', this.handleRtcUserReconnected);
    this.rtcClient.off('direct-livestreaming-state-changed', this.handleRtcDirectLivestreamingStateChanged);
    this.rtcClient.off('transcoding-livestreaming-state-changed', this.handleRtcTranscodingLivestreamingStateChanged);
    RtmManager.removeRtmChannelListener(
      this.handleRtmMessageReceived,
    );
  }

  /**
   * 上麦
   * @param uid
   * @param userExtension
   */
  private userSitDown(uid: string, userExtension?: UserExtension) {
    const isOnMic = this.mMicSeats.some(mMicSeat => mMicSeat.uid === uid);
    const currentMicSeat: MutableTrackRoomSeat = {
      isOwnerOpenVideo: false,
      isOwnerOpenAudio: false,
      uid,
      userExtension,
      isMySeat: uid === this.currentUserId
    };
    this.mMicSeats = isOnMic ? this.mMicSeats : this.mMicSeats.concat(currentMicSeat);
    if (!isOnMic) {
      this.micSeatListeners.forEach(
        listener => listener.onUserSitDown?.(currentMicSeat)
      );
    }
  }

  /**
   * 下麦
   * @param uid
   */
  private userSitUp(uid: string) {
    const currentMicSeat = this.getMicSeatByUid(uid);
    this.mMicSeats = this.mMicSeats.filter(
      mMicSeat => mMicSeat.uid !== uid
    );
    log.log('userSitUp', currentMicSeat);
    if (currentMicSeat) {
      log.log('userSitUp', currentMicSeat);
      this.micSeatListeners.forEach(
        listener => listener.onUserSitUp?.(currentMicSeat)
      );
    }
  }

  /**
   * 用户摄像头状态改变
   * @param uid
   * @param isOpen
   */
  private userCameraStatusChanged(uid: string, isOpen: boolean) {
    this.mMicSeats = this.mMicSeats.map(
      mMicSeat => mMicSeat.uid === uid ? {
        ...mMicSeat,
        isOwnerOpenVideo: isOpen
      } : mMicSeat
    );
    const currentMicSeat = this.getMicSeatByUid(uid);
    if (currentMicSeat) {
      this.micSeatListeners.forEach(
        listener => listener.onCameraStatusChanged?.(currentMicSeat)
      );
    }
  }

  /**
   * 用户麦克风状态改变
   * @param uid
   * @param isOpen
   */
  private userMicrophoneStatusChanged(uid: string, isOpen: boolean) {
    this.mMicSeats = this.mMicSeats.map(
      mMicSeat => mMicSeat.uid === uid ? {
        ...mMicSeat,
        isOwnerOpenAudio: isOpen
      } : mMicSeat
    );
    const currentMicSeat = this.getMicSeatByUid(uid);
    if (currentMicSeat) {
      this.micSeatListeners.forEach(
        listener => listener.onMicrophoneStatusChanged?.(currentMicSeat)
      );
    }
  }

  /**
   * 监听IM消息
   * @param msg
   * @param peerId
   */
  private handleRtmMessageReceived(msg: string, peerId: string) {
    const signaling: SitDownUpSignaling | CameraMicStatusSignaling = JSON.parse(msg || '{}');
    if (signaling.action === 'rtc_sitDown') {
      return this.userSitDown(
        signaling.data.uid,
        signaling.data.userExtension || undefined
      );
    }
    if (signaling.action === 'rtc_sitUp') {
      return this.userSitUp(
        signaling.data.uid,
      );
    }
    if (signaling.action === 'rtc_cameraStatus') {
      return this.userCameraStatusChanged(
        signaling.data.uid,
        signaling.data.isOwnerOpenVideo,
      );
    }
    if (signaling.action === 'rtc_microphoneStatus') {
      return this.userMicrophoneStatusChanged(
        signaling.data.uid,
        signaling.data.isOwnerOpenAudio,
      );
    }
  }

  /**
   * 用户加入房间
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-joined
   * @param remoteUserID
   * @param userData
   */
  private handleRtcUserJoined(remoteUserID: string, userData?: string) {
    log.log('user-joined remoteUserID_userData', remoteUserID, userData);
    const userExtension: UserExtension = JSON.parse(userData || '{}');
    if (userExtension.clientRoleType === ClientRoleType.CLIENT_ROLE_BROADCASTER) {
      this.userSitDown(remoteUserID, userExtension);
    }
  }


  /**
   * 用户离开房间
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-left
   * @param remoteUserID
   */
  private handleRtcUserLeft(remoteUserID: string) {
    log.log('user-left', remoteUserID);
    this.userSitUp(remoteUserID);
  }

  /**
   * 用户添加媒体轨
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-published
   * @param userID
   * @param tracks
   */
  private handleRtcUserPublished(
    userID: string,
    tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]
  ) {
    const subscribeTracks = this.getSubscribeTracks(
      tracks.filter(
        track => track.tag === TAG_CAMERA || track.tag === TAG_MICROPHONE
      )
    );
    log.log('user-published', userID, tracks);
    log.log('subscribeTracks', subscribeTracks);
    if (!subscribeTracks.length) return;
    this.rtcClient.subscribe(subscribeTracks).then((res) => {
      this.subscribedTracks = this.subscribedTracks.concat(subscribeTracks);
      log.log('订阅成功 res', res);
      log.log('订阅成功 subscribedTracks', this.subscribedTracks);
      this.addTrackMuteListener(subscribeTracks);
      this.initTrackMicSeats(subscribeTracks);
      log.log('mMicSeats', this.mMicSeats);
    });
  }

  /**
   * 用户移除媒体轨
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-unpublished
   * @param userID
   * @param tracks
   */
  private handleRtcUserUnpublished(userID: string, tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]) {
    this.subscribedTracks = this.subscribedTracks.filter(
      subscribedTrack => tracks.every(
        track => track.trackID !== subscribedTrack.trackID
      )
    );
    log.log('user-unpublished', userID, tracks);
    tracks.forEach(track => {
      if (track.tag === TAG_CAMERA && track.userID) {
        this.userCameraStatusChanged(track.userID, false);
      }
      if (track.tag === TAG_MICROPHONE && track.userID) {
        this.userMicrophoneStatusChanged(track.userID, false);
      }
    });
  }

  /**
   * 连接状态改变
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#connection-state-changed
   * @param connectionState
   * @param info
   */
  private handleRtcConnectionStateChanged(connectionState: QNConnectionState, info: QNConnectionDisconnectedInfo) {
    log.log('connection-state-changed', connectionState, info);
  }

  /**
   * 信息接收
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#message-received
   * @param message
   */
  private handleRtcMessageReceived(message: QNCustomMessage) {
    log.log('message-received', message);
  }

  /**
   * 用户重连中
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-reconnecting
   * @param remoteUserID
   */
  private handleRtcUserReconnecting(remoteUserID: string) {
    log.log('user-reconnecting', remoteUserID);
  }

  /**
   * 用户重连成功
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-reconnected
   * @param remoteUserID
   */
  private handleRtcUserReconnected(remoteUserID: string) {
    log.log('user-reconnected', remoteUserID);
  }

  /**
   * CDN 转推状态变化
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#direct-livestreaming-state-changed
   * @param streamID
   * @param state
   */
  private handleRtcDirectLivestreamingStateChanged(streamID: string, state: QNLiveStreamingState) {
    log.log('direct-livestreaming-state-changed', streamID, state);
  }

  /**
   * 合流转推状态变化
   * @link https://developer.qiniu.com/rtc/9090/WebQNRTCClient#transcoding-livestreaming-state-changed
   * @param streamID
   * @param state
   */
  private handleRtcTranscodingLivestreamingStateChanged(streamID: string, state: QNLiveStreamingState) {
    log.log('transcoding-livestreaming-state-changed', streamID, state);
  }

  /**
   * 初始化track对应麦位数据
   * @param tracks
   */
  private initTrackMicSeats(tracks: QNRemoteTrack[]) {
    log.log('initTrackMicSeats tracks', tracks);
    tracks.forEach(track => {
      const isOpen = !track.isMuted();
      if (track.tag === TAG_CAMERA && track.userID) {
        this.userCameraStatusChanged(track.userID, isOpen);
      }
      if (track.tag === TAG_MICROPHONE && track.userID) {
        this.userMicrophoneStatusChanged(track.userID, isOpen);
      }
    });
  }

  /**
   * 监听track的mute事件
   */
  private addTrackMuteListener(tracks: QNRemoteTrack[]) {
    log.log('addSubscribedTrackMuteListener');
    tracks.forEach(track => {
      track.on('mute-state-changed', (isMuted: boolean) => {
        log.log('mute-state-changed', isMuted);
        if (track.tag === TAG_CAMERA && track.userID) {
          return this.userCameraStatusChanged(track.userID, !isMuted);
        }
        if (track.tag === TAG_MICROPHONE && track.userID) {
          return this.userMicrophoneStatusChanged(track.userID, !isMuted);
        }
      });
    });
  }

  /**
   * 初始化远端用户麦位
   */
  private initRemoteMicSeats() {
    log.log('initRemoteMicSeats remoteUsers', this.rtcClient.remoteUsers);
    log.log('initRemoteMicSeats rtcClient', this.rtcClient);
    this.rtcClient.remoteUsers.forEach(remoteUser => {
      const userExtension: UserExtension = JSON.parse(remoteUser.userData || '{}');
      if (userExtension.clientRoleType === ClientRoleType.CLIENT_ROLE_BROADCASTER) {
        this.userSitDown(remoteUser.userID, userExtension);
        const tracks = [
          ...remoteUser.getAudioTracks(),
          ...remoteUser.getVideoTracks()
        ];
        this.initTrackMicSeats(tracks);
      }
    });
  }

  /**
   * 根据id查找麦位
   * @param uid
   */
  private getMicSeatByUid(uid: string): MutableTrackRoomSeat | undefined {
    return this.mMicSeats.find(
      mMicSeat => mMicSeat.uid === uid
    );
  }
}


export default MutableTrackRoom;
