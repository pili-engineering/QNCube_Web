import request from './request';
import { IMConfig } from './baseApi';

export type SceneType = 'ktv' | 'show' | 'classroom';

export type BaseRoomRole = 'student' | 'teacher';

export type BaseRoomClassType = 1 | 2; // 1: 小班课，2: 1v1

export const sceneType = 'classroom';

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
 * 通用创建房间
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2283
 * @param {BaseCreateRoomApiRequestData} data
 */
export function baseCreateRoomApi(data: Omit<BaseCreateRoomApiRequestData, 'type'>) {
  return request.post<BaseCreateRoomApiResponseData, BaseCreateRoomApiResponseData>(
    '/v1/base/createRoom',
    {
      ...data,
      type: sceneType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
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
 * 通用加入房间
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2292
 * @param {BaseJoinRoomApiRequestData} data
 */
export function baseJoinRoomApi(data: Omit<BaseJoinRoomApiRequestData, 'type'>) {
  return request.post<BaseJoinRoomApiResponseData, BaseJoinRoomApiResponseData>(
    '/v1/base/joinRoom',
    {
      ...data,
      type: sceneType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
}

/**
 * 通用离开房间请求参数
 */
export interface BaseLeaveRoomApiRequestData {
  roomId: string;
  type: SceneType;
}

/**
 * 通用离开房间返回数据
 */
export interface baseLeaveRoomApiResponseData {}

/**
 * 通用离开房间
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2301
 * @param {BaseLeaveRoomApiRequestData} data
 */
export function baseLeaveRoomApi(data: Omit<BaseLeaveRoomApiRequestData, 'type'>) {
  return request.post<baseLeaveRoomApiResponseData, baseLeaveRoomApiResponseData>(
    '/v1/base/leaveRoom',
    {
      ...data,
      type: sceneType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
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

/**
 * 通用房间列表
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2310
 * @param {BaseListRoomApiRequestData} data
 */
export function baseListRoomApi(data: Omit<BaseListRoomApiRequestData, 'type'>) {
  return request.get<BaseListRoomApiResponseData, BaseListRoomApiResponseData>(
    '/v1/base/listRoom',
    {
      params: {
        ...data,
        type: sceneType,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
}

export interface BaseHeartBeatApiRequestData {
  type: SceneType;
  roomId: string;
}

export interface BaseHeartBeatApiResponseData {
  interval?: number;
}

/**
 * 通用心跳
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2319
 * @param {BaseHeartBeatApiRequestData} data
 */
export function baseHeartBeatApi(data: Omit<BaseHeartBeatApiRequestData, 'type'>) {
  return request.get<BaseHeartBeatApiResponseData, BaseHeartBeatApiResponseData>(
    '/v1/base/heartBeat',
    {
      params: {
        ...data,
        type: sceneType,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
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
  mics?: Partial<BaseRoomMic>[]
}

/**
 * 通用获取完整房间信息
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2328
 * @param {BaseGetRoomInfoApiRequestData} data
 */
export function baseGetRoomInfoApi(data: Omit<BaseGetRoomInfoApiRequestData, 'type'>) {
  const { roomId } = data;
  return request.get<BaseGetRoomInfoApiResponseData, BaseGetRoomInfoApiResponseData>(
    `/v1/base/getRoomInfo/${sceneType}/${roomId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
}

export interface BaseUpMicApiRequestData {
  roomId: string;
  type: SceneType;
  userExtension: string;
  attrs: BaseRoomAttrs;
  params: BaseRoomParams;
}

export interface BaseUpMicApiResponseData {
  mics?: Partial<BaseRoomMic>[]
}

/**
 * 通用上麦接口
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2337
 * @param {BaseUpMicApiRequestData} data
 */
export function baseUpMicApi(data: Omit<BaseUpMicApiRequestData, 'type'>) {
  return request.post<BaseUpMicApiResponseData, BaseUpMicApiResponseData>(
    '/v1/base/upMic',
    {
      ...data,
      type: sceneType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
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

/**
 * 通用更新房间属性
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2346
 * @param {BaseUpdateRoomAttrApiRequestData} data
 */
export function baseUpdateRoomAttrApi(data: Omit<BaseUpdateRoomAttrApiRequestData, 'type'>) {
  return request.post<BaseUpdateRoomAttrApiResponseData, BaseUpdateRoomAttrApiResponseData>(
    '/v1/base/updateRoomAttr',
    {
      ...data,
      type: sceneType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
}

export interface baseUpdateMicAttrApiRequestData {
  roomId: string;
  uid: string;
  type: SceneType;
  attrs: BaseRoomAttrs;
}

export interface baseUpdateMicAttrApiResponseData {

}

/**
 * 通用更新麦位属性
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2355
 * @param {baseUpdateMicAttrApiRequestData} data
 */
export function baseUpdateMicAttrApi(data: Omit<baseUpdateMicAttrApiRequestData, 'type'>) {
  return request.post(
    '/v1/base/updateMicAttr',
    {
      ...data,
      type: sceneType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
}

export interface BaseDownMicApiRequestData {
  roomId: string;
  type: SceneType;
  uid?: string;
}

export interface BaseDownMicApiResponseData {

}

/**
 * 通用下麦接口
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2400
 * @param {BaseDownMicApiRequestData} data
 */
export function baseDownMicApi(data: Omit<BaseDownMicApiRequestData, 'type'>) {
  return request.post<BaseDownMicApiResponseData, BaseDownMicApiResponseData>(
    '/v1/base/downMic',
    {
      ...data,
      type: sceneType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
}

export interface BaseGetRoomMicInfoApiRequestData {
  type: SceneType;
  roomId: string;
}

export interface BaseGetRoomMicInfoApiResponseData {
  roomInfo: BaseRoomInfo;
  mics: BaseRoomMic[];
}

/**
 * 通用获取房间麦位列表自定义数据接口
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2409
 * @param {BaseGetRoomMicInfoApiRequestData} data
 */
export function baseGetRoomMicInfoApi(data: Omit<BaseGetRoomMicInfoApiRequestData, 'type'>) {
  return request.get<BaseGetRoomMicInfoApiResponseData, BaseGetRoomMicInfoApiResponseData>(
    '/v1/base/getRoomMicInfo',
    {
      params: {
        ...data,
        type: sceneType,
      },
    },
  );
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

/**
 * 通用查询房间自定义属性值
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2418
 * @param {BaseGetRoomAttrApiRequestData} data
 */
export function baseGetRoomAttrApi(data: Omit<BaseGetRoomAttrApiRequestData, 'type'>) {
  return request.get<BaseGetRoomAttrApiResponseData, BaseGetRoomAttrApiResponseData>(
    '/v1/base/getRoomAttr',
    {
      params: {
        ...data,
        type: sceneType,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
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
 * 通用查询麦位自定义属性值
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2427
 * @param {BaseGetMicAttrApiRequestData} data
 */
export function baseGetMicAttrApi(data: Omit<BaseGetMicAttrApiRequestData, 'type'>) {
  return request.get<BaseGetMicAttrApiResponseData, BaseGetMicAttrApiResponseData>(
    '/v1/base/getMicAttr',
    {
      params: {
        ...data,
        type: sceneType,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    },
  );
}
