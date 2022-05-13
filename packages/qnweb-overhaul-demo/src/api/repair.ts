import qs from 'qs';
import request from './request';
import { BaseUserInfo, IMConfig } from './common';

export enum Role {
  Staff = 'staff',
  Professor = 'professor',
  Student = 'student'
}

export interface RepairCreateRoomReq {
  title: string;
  role: Role;
}

export interface RoomInfo {
  roomId: string;
  title: string;
  image: string;
  status: number;
}

export interface RtcInfo {
  roomToken?: string;
  publishUrl?: string;
  rtmpPlayUrl?: string;
  flvPlayUrl?: string;
  hlsPlayUrl?: string;
}

export interface RepairCreateRoomRes {
  roomToken?: string;
  publishUrl?: string;
  userInfo?: Partial<BaseUserInfo>;
  roomInfo?: RoomInfo;
  rtcInfo?: RtcInfo
}

/**
 * 创建房间
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2220
 * @param data
 */
export function repairCreateRoomApi(data: RepairCreateRoomReq) {
  return request.post<RepairCreateRoomRes, RepairCreateRoomRes>('/v1/repair/createRoom', qs.stringify(data), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`,
    },
  });
}

export type BaseUserInfoWithRole = BaseUserInfo & {
  role: Role
}

export type RepairJoinRoomRes = RepairCreateRoomRes & {
  allUserList?: BaseUserInfoWithRole[];
  imConfig?: IMConfig;
}

export interface RepairJoinRoomReq {
  roomId: string;
  role: Role;
}

/**
 * 加入房间
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2229
 * @param data
 */
export function repairJoinRoomApi(data: RepairJoinRoomReq) {
  return request.post<RepairJoinRoomRes, RepairJoinRoomRes>('/v1/repair/joinRoom', qs.stringify(data), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`,
    },
  });
}

/**
 * 离开房间
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2238
 * @param roomId
 */
export function repairLeaveRoomApi(roomId: string) {
  return request.get(`/v1/repair/leaveRoom/${roomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`,
    },
  });
}

export interface RepairListRoomReq {
  pageSize?: number;
  pageNum?: number;
}

export interface RepairListRoomResRoom {
  image?: string;
  title?: string;
  status?: number;
  options?: RepairListRoomResRoomOption[];
  roomId?: string;
}

export interface RepairListRoomResRoomOption {
  role: Role;
  title: string;
}

export interface RepairListRoomRes {
  nextPageNum?: number;
  cnt?: number;
  pageSize?: number;
  list?: RepairListRoomResRoom[];
  currentPageNum?: number;
  nextId?: string;
  total?: number;
  endPage?: boolean;
}

/**
 * 房间列表
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2247
 * @param params
 */
export function repairListRoomApi(params: RepairListRoomReq) {
  return request.get<RepairListRoomRes, RepairListRoomRes>('/v1/repair/listRoom', {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`,
    },
  });
}

export interface RepairHeartBeatRes {
  interval?: number;
}

/**
 * 心跳
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2256
 * @param roomId
 */
export function repairHeartBeatApi(roomId: string) {
  return request.get<RepairHeartBeatRes, RepairHeartBeatRes>(`/v1/repair/heartBeat/${roomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`,
    },
  });
}

export type RepairGetRoomInfoRes = Omit<RepairJoinRoomRes, 'roomToken'>

/**
 * 刷新房间信息
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2265
 * @param roomId
 */
export function repairGetRoomInfoApi(roomId: string) {
  return request.get<RepairGetRoomInfoRes, RepairGetRoomInfoRes>(`/v1/repair/getRoomInfo/${roomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`,
    },
  });
}
