import {
  BarrageEntity,
  CustomMicSeat,
  GiftEntity,
  Invitation, LikeEntity,
  PkSession,
  ScreenMicSeat, UserExtension,
  UserMicSeat
} from './signalingData';

const isObject = (obj: unknown): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export type AddTimestamp<T extends Record<string, any>> = T & {
  timestamp?: number;
}

/**
 * 屏幕共享信令
 */
export interface ScreenSignaling {
  action: 'rtc_pubScreen' | 'rtc_unPubScreen',
  data: AddTimestamp<ScreenMicSeat>,
}

/**
 * 自定义轨道信令
 */
export interface CustomTrackSignaling {
  action: 'rtc_pubCustomTrack' | 'rtc_unPubCustomTrack',
  data: AddTimestamp<CustomMicSeat>,
}

/**
 * 麦上用户麦克风/摄像头状态改变信令
 */
export interface CameraMicStatusSignaling {
  action: 'rtc_microphoneStatus' | 'rtc_cameraStatus',
  data: AddTimestamp<UserMicSeat>,
}

/**
 * 踢人信令
 */
export type KickOutSignaling = {
  action: 'rtc_kickOutFromMicSeat',
  data: AddTimestamp<{
    seat: UserMicSeat,
    msg: string,
  }>
} | {
  action: 'rtc_kickOutFromRoom',
  data: AddTimestamp<{
    uid: string,
    msg: string,
  }>
}

/**
 * 上下麦信令
 */
export interface SitDownUpSignaling {
  action: 'rtc_sitDown' | 'rtc_sitUp',
  data: AddTimestamp<UserMicSeat>,
}

/**
 * 用户角色进入退出信令
 */
export type UserJoinSignaling = {
  action: 'rtc_userJoin' | 'rtc_userLeft',
  data: AddTimestamp<UserExtension>,
}

/**
 * 连麦者上下麦信令
 */
export interface LinkerSitDownUpSignaling {
  action: 'rtc_linker_sitDown' | 'rtc_linker_sitUp',
  data: AddTimestamp<UserMicSeat>,
}

/**
 * 连麦踢人信令
 */
export interface LinkerKickOutFromMicSeatSignaling {
  action: 'rtc_linker_kickOutFromMicSeat',
  dat: AddTimestamp<{
    micSeat: UserMicSeat,
    msg: string,
  }>,
}

/**
 * pk信令
 */
export type PkSignaling = {
  action: 'rtc_onPKStart',
  data: AddTimestamp<PkSession>,
} | {
  action: 'rtc_onError' | 'rtc_onPKStop',
  data: AddTimestamp<{
    code: number,
    msg: string,
  }>
} | {
  action: 'rtc_onPkEvent',
  data: AddTimestamp<{
    eventKey: number,
    value: string
  }>
}

/**
 * 邀请信令
 */
export interface InviteSignaling {
  action: 'invite_send' | 'invite_cancel' | 'invite_accept' | 'invite_reject',
  data: AddTimestamp<Invitation>,
}

/********** demo 层 **********/
/**
 * 公聊/进入/退出信令
 */
export interface PubSignaling {
  action: 'pub_chat_text' | 'welcome' | 'quit_room',
  data: AddTimestamp<{
    senderId: string,
    senderName: string,
    msgContent: string,
  }>,
}

export const isPubSignaling = (signaling: unknown): signaling is PubSignaling => {
  if (!isObject(signaling)) return false;
  const value = (<Record<string, unknown>>signaling);
  return value.action === 'pub_chat_text' ||
    value.action === 'welcome' ||
    value.action === 'quit_room';
};

/**
 * 弹幕信令
 */
export interface BarrageSignaling {
  action: 'living_danmu',
  data: AddTimestamp<BarrageEntity>,
}

/**
 * 礼物信令
 */
export interface GiftSignaling {
  action: 'living_gift',
  data: AddTimestamp<GiftEntity>,
}

/**
 * 直播间点赞信令
 */
export interface LikeSignaling {
  action: 'living_heart',
  data: AddTimestamp<LikeEntity>,
}

/********** demo 层 **********/

/**
 * 房间属性变更
 * 通用信令
 */
export interface ChannelAttributesChangeJson {
  action: 'channelAttributes_change',
  data: AddTimestamp<{
    // watch_movie_together: 一起看电影
    key: string,
    roomId: string,
    value: string,
  }>
}
