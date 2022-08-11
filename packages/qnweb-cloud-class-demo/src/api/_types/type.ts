export interface IMConfig {
  imGroupId?: number;
  imPassword?: string;
  imToken?: string;
  imUid?: string;
  imUsername?: string;
  type?: number;
}

export interface UserInfo {
  accountId: string;
  nickname: string;
  avatar: string;
  phone: string;
  loginToken: string;
  imConfig?: IMConfig;
}

export type BaseUserInfo = Omit<UserInfo, 'imConfig' | 'loginToken'> & { profile: string };

export interface AppConfig {
  welcome?: { image?: string; url?: string; extra: { [k: string]: string } };
}

export interface Scenes {
  total: number;
  nextId?: string;
  cnt: number;
  list: Array<{ id: string; title: string; url: string; desc: string; icon: string; }>;
}

export interface UpdateAccountInfoApiData {
  accountId?: string;
  nickname: string;
}

export type SceneType = 'ktv' | 'show' | 'classroom';

export type BaseRoomRole = 'student' | 'teacher';

export type BaseRoomClassType = 1 | 2; // 1: 小班课，2: 1v1

/**
 * 房间信息
 */
export interface BaseRoomInfo {
  creator: string;
  desc: string;
  title: string;
  status: number;
  type: SceneType;
  image: string;
  roomId: string;
  params: BaseRoomParams;
  attrs: BaseRoomAttrs;
}

/**
 * RTC 相关信息
 */
export interface BaseRtcInfo {
  roomToken: string;
  hlsPlayUrl: string;
  rtmpPlayUrl: string;
  publishUrl: string;
  flvPlayUrl: string;
}

/**
 * 用户信息
 */
export interface BaseRoomUserInfo {
  phone: string;
  userId: string;
  role: BaseRoomRole;
  profile: string;
  nickname: string;
  avatar: string;
}

/**
 * 自定义 key-value
 */
export type BaseRoomAttrs = Array<{ key: string; value: unknown }>;

/**
 * 服务端通用 BaseRoomParams
 */
export type BaseRoomParams = Array<{ key: string; value: unknown }>;

/**
 * 麦位
 */
export interface BaseRoomMic {
  userExtension: string;
  micId: string;
  attrs: BaseRoomAttrs;
  params: BaseRoomParams;
}

/**
 * 通用创建房间请求参数
 */
export interface BaseCreateRoomApiRequestData {
  title: string;
  desc?: string;
  type: SceneType;
  image?: string;
  attrs?: BaseRoomAttrs;
  params: BaseRoomParams;
}

/**
 * 通用创建房间返回数据
 */
export interface BaseCreateRoomApiResponseData {
  roomInfo?: Partial<BaseRoomInfo>;
  userInfo?: Partial<BaseRoomUserInfo>;
  rtcInfo?: Partial<BaseRtcInfo>;
}

/**
 * 通用加入房间请求参数
 */
export interface BaseJoinRoomApiRequestData {
  roomId: string;
  type: SceneType;
  params?: BaseRoomParams;
}

/**
 * 通用加入房间返回数据
 */
export interface BaseJoinRoomApiResponseData {
  roomInfo?: Partial<BaseRoomInfo>;
  userInfo?: Partial<BaseRoomUserInfo>;
  rtcInfo?: Partial<BaseRtcInfo>;
  allUserList?: BaseRoomUserInfo[];
  imConfig?: IMConfig;
}

/**
 * 通用房间列表请求参数
 */
export interface BaseListRoomApiRequestData {
  pageSize?: number;
  pageNum?: number;
  type: SceneType;
}

/**
 * 通用房间列表返回数据
 */
export interface BaseListRoomApiResponseData {
  total?: number;
  nextId?: string;
  cnt?: number;
  currentPageNum?: number;
  nextPageNum?: number;
  pageSize?: number;
  endPage?: boolean;
  rooms?: Partial<BaseRoomInfo>[];
}

export interface BaseHeartBeatApiRequestData {
  type: SceneType;
  roomId: string;
}

export interface BaseHeartBeatApiResponseData {
  interval?: number;
}

export interface BaseGetRoomInfoApiRequestData {
  type: SceneType;
  roomId: string;
}

export interface BaseGetRoomInfoApiResponseData {
  roomInfo?: Partial<BaseRoomInfo>;
  userInfo?: Partial<BaseRoomUserInfo>;
  rtcInfo?: Partial<BaseRtcInfo>;
  allUserList?: BaseRoomUserInfo[];
  mics?: Partial<BaseRoomMic>[];
}

export interface BaseUpMicApiRequestData {
  roomId: string;
  type: SceneType;
  userExtension: string;
  attrs: BaseRoomAttrs;
  params: BaseRoomParams;
}

export interface BaseUpMicApiResponseData {
  mics?: Partial<BaseRoomMic>[];
}

export interface BaseUpdateRoomAttrApiRequestData {
  roomId?: string;
  type?: SceneType;
  attrs?: BaseRoomAttrs;
}

export interface BaseUpdateRoomAttrApiResponseData {
  userInfo?: Partial<BaseRoomUserInfo>;
  roomInfo?: Partial<BaseRoomInfo>;
}

export interface BaseUpdateMicAttrApiRequestData {
  roomId: string;
  uid: string;
  type: SceneType;
  attrs: BaseRoomAttrs;
}

export interface BaseDownMicApiRequestData {
  roomId: string;
  type: SceneType;
  uid?: string;
}

export interface BaseGetRoomMicInfoApiRequestData {
  type: SceneType;
  roomId: string;
}

export interface BaseGetRoomMicInfoApiResponseData {
  roomInfo: BaseRoomInfo;
  mics: BaseRoomMic[];
}

export interface BaseGetRoomAttrApiRequestData {
  roomId: string;
  type: SceneType;
  // attrKey 值，不传返回所有
  attrKey?: string;
}

export interface BaseGetRoomAttrApiResponseData {
  attrs: BaseRoomAttrs;
}

export interface BaseGetMicAttrApiRequestData {
  roomId: string;
  uid: string;
  type: SceneType;
  attrKey?: string;
}

export interface BaseGetMicAttrApiResponseData {
  attrs: BaseRoomAttrs;
}

/**
 * 通用离开房间请求参数
 */
export interface BaseLeaveRoomApiRequestData {
  roomId: string;
  type: SceneType;
}
