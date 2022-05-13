/**
 * 房间实体抽象
 */
import { MicSeat, ScreenMicSeat } from './signalingData';

export interface RoomEntity {
  /**
   * 房间 id
   */
  roomId?: string;

  /**
   * 群 id
   */
  imGroupId?: string;

  /**
   * 合流任务id
   */
  streamID?: string;

  /**
   * 推流地址
   */
  pushUri?: string;

  /**
   * 拉流地址
   */
  pullUri?: string;

  /**
   * 房间 token
   */
  roomToken?: string;
}

/**
 * 麦位事件监听回调
 */
export type MicSeatListenerCallback<T extends MicSeat = MicSeat> = (res: T) => void;

/**
 * 麦位事件监听
 */
export interface MicSeatListener<T extends MicSeat = MicSeat> {
  /**
   * 有人上麦
   * @param seat
   */
  onUserSitDown?: MicSeatListenerCallback<T>;

  /**
   * 有人下麦
   * @param seat
   */
  onUserSitUp?: MicSeatListenerCallback<T>;

  /**
   * 麦克风状态改变
   * @param seat
   */
  onMicrophoneStatusChanged?: MicSeatListenerCallback<T>;

  /**
   * 摄像头状态改变
   * @param seat
   */
  onCameraStatusChanged?: MicSeatListenerCallback<T>;
}

export enum ClientRoleType {
  /**
   * 主播角色
   */
  CLIENT_ROLE_BROADCASTER = 0,
  /**
   * 用户角色
   */
  CLIENT_ROLE_AUDIENCE = 1,
  /**
   * 拉流角色
   */
  CLIENT_ROLE_PULLER = -1
}

/**
 * 屏幕共享麦位监听事件回调
 */
export interface ScreenMicSeatListener {
  onScreenMicSeatAdd?(seat: ScreenMicSeat): void;

  onScreenMicSeatRemove?(seat: ScreenMicSeat): void;
}
