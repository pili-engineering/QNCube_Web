import { AddTimestamp } from '../types';

/**
 * roomToken存在的信息
 */
export interface RtcRoomInfo {
  appId: string;
  expireAt: number;
  permission: string;
  roomName: string;
  userId: string;
}

/**
 * 解析roomToken
 * @param token
 */
export function parseRoomToken(token: string): RtcRoomInfo {
  const splitRoomToken = token.split(':');
  const lastString = splitRoomToken[splitRoomToken.length - 1] || '';
  const decodedString = atob(lastString);
  return JSON.parse(decodedString) || {};
}

/**
 * 添加时间戳属性
 * @param value
 */
export function addTimeStamp<T = Record<string, any>>(value: T): AddTimestamp<T> {
  const timestamp = new Date().getTime();
  return {
    ...value,
    timestamp,
  };
}
