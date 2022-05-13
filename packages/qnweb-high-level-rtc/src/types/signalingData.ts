/********** 麦位相关 **********/
import { ClientRoleType } from '../types';

/**
 * 麦位用户扩展信息
 */
export interface UserExtension {
  uid?: string,
  // 用户扩展类型
  userExtRoleType?: string,
  // 用户扩展资料
  userExtProfile?: string | Record<string, unknown>,
  // 加入房间附加的扩展字段
  userExtensionMsg?: string,
  // 内部角色
  clientRoleType?: ClientRoleType,
}

/**
 * 基础麦位信息
 */
export interface MicSeat {
  // 用户ID
  uid: string,
  // 是否是自己的座位
  isMySeat?: boolean,
}

/**
 * 屏幕共享麦位信息
 */
export interface ScreenMicSeat extends MicSeat {
  isScreenOpen: boolean,
}

/**
 * 用户自定义麦位信息
 */
export interface CustomMicSeat extends MicSeat {
  // tag标记是啥麦位
  tag: string,
  // 是否开启麦克风
  isAudioOpen: false,
  // 是否开启摄像头
  isVideoOpen: false,
}

/**
 * 用户麦位
 */
export interface UserMicSeat extends MicSeat {
  // 麦位主人是不是打开了麦克风
  isOwnerOpenAudio: boolean,
  // 麦位主人是不是打开了摄像头
  isOwnerOpenVideo: boolean,
  // 麦位用户扩展字段
  userExtension?: UserExtension | null,
}

/********** 麦位相关 **********/

/********** 房间内交互 **********/
/**
 * 禁麦实体
 */
export interface ForbiddenMicSeatMsg {
  uid: string,
  isForbidden: boolean,
  msg: string,
}

/**
 * pk
 */
export interface PkSession {
  initiatorLiver: UserMicSeat,
  receiverLiver: UserMicSeat,
  // pk场次
  pkSessionId: string,
  // pk扩展字段
  pkExtension: string,
}

/**
 * 邀请实体
 */
export interface Invitation {
  // 邀请场次, 内部维护
  flag: string,
  // 本次操作带的自定义数据
  msg: string,
  // 时间戳
  timeStamp: number,
  // 邀请方
  initiatorUid: string,
  // 被邀请方
  receiver: string,
  // 可为空 空代表c2c
  channelId: string,
}

/********** 房间内交互 **********/

/********** demo 层 **********/
/**
 * 弹幕实体
 */
export interface BarrageEntity {
  content: string,
  senderName: string,
  senderUid: string,
  senderRoomId: string,
  senderAvatar: string,
}

/**
 * 礼物信息
 */
export interface GiftInfo {
  giftName: string,
  giftId: string,
  giftRes: number,
}

/**
 * 礼物实体
 */
export interface GiftEntity {
  senderName: string,
  senderUid: string,
  senderRoomId: string,
  senderAvatar: string,
  number: number,
  sendGift: GiftInfo,
}

/**
 * 直播间点赞实体
 */
export interface LikeEntity {
  // 点赞数量
  count: number,
  senderName: string,
  senderUid: string,
  senderRoomId: string,
}

/********** demo 层 **********/
