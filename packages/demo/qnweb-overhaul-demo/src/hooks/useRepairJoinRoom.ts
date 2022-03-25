import { useEffect, useRef, useState } from 'react';
import {
  repairHeartBeatApi,
  repairJoinRoomApi, RepairJoinRoomRes, Role,
} from '../api';

const useRepairJoinRoom = (roomId: string, role: Role) => {
  const [repairRoomJoined, setRepairRoomJoined] = useState(false);
  const [repairJoinRoomRes, setRepairJoinRoomRes] = useState<RepairJoinRoomRes>();
  const heartBeatTimer = useRef<NodeJS.Timer | null>(null);

  /**
   * 加入房间
   */
  useEffect(() => {
    if (roomId && role) {
      repairJoinRoomApi({
        roomId,
        role,
      }).then((res) => {
        setRepairJoinRoomRes(res);
        setRepairRoomJoined(true);
      });
    }
  }, [roomId, role]);

  /**
   * 心跳检测
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    /**
     * 心跳回调
     * @param rId
     */
    function heartBeat(rId: string) {
      return repairHeartBeatApi(rId).then((res) => {
        const interval = res.interval || 1000;
        heartBeatTimer.current = setTimeout(() => {
          heartBeat(roomId);
        }, interval * 1000);
      });
    }
    if (repairRoomJoined) {
      heartBeat(roomId);
      return () => {
        if (heartBeatTimer.current) {
          clearTimeout(heartBeatTimer.current);
        }
      };
    }
  }, [repairRoomJoined, roomId]);

  return {
    repairRoomJoined,
    repairJoinRoomRes,
  };
};

export default useRepairJoinRoom;
