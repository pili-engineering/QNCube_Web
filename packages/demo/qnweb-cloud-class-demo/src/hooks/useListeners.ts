import { RoomState, TrackModeSession } from 'pili-rtc-web';
import { useEffect, useState } from 'react';

/**
 * 其他原因导致和房间连接断开且不可恢复
 * @link https://doc.qnsdk.com/rtn/web/docs/api_track_mode_session#29_8
 */
export const QNRTCDisconnectCodeMessage = {
  10001: 'token 错误',
  10002: 'token 过期',
  10004: 'reconnect token 过期',
  10006: '被管理员踢出房间', // 被管理员踢出房间
  10007: '断线重连失败',
  10022: '该用户在其他页面或终端登录',
  10011: '房间人数已满',
};

export interface QNRTCDisconnectResponse {
  code: keyof typeof QNRTCDisconnectCodeMessage;
  data: unknown;
}

const useListeners = (room: TrackModeSession) => {
  const [disconnectCode, setDisconnectCode] = useState<QNRTCDisconnectResponse['code']>();
  const [roomState, setRoomState] = useState<RoomState>();
  const handleDisconnect = ({ code, data }: QNRTCDisconnectResponse) => {
    console.log('handleDisconnect code', code);
    console.log('handleDisconnect message', QNRTCDisconnectCodeMessage[code]);
    console.log('handleDisconnect data', data);
    setDisconnectCode(code);
  };
  const handleRoomStateChange = (state: RoomState) => {
    console.log('current roomState is', state);
    setRoomState(state);
  };
  useEffect(() => {
    room.on('disconnect', handleDisconnect);
    room.on('room-state-change', handleRoomStateChange);
    return () => {
      room.off('disconnect', handleDisconnect);
      room.off('room-state-change', handleRoomStateChange);
    };
  }, [room]);

  return {
    disconnectCode,
    roomState,
  };
};

export default useListeners;
