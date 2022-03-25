import { useEffect, useState } from 'react';
import { repairGetRoomInfoApi, RepairGetRoomInfoRes } from '../api';

/**
 * 房间信息
 * @param roomId
 */
const useRepairRoomInfo = (roomId: string) => {
  const [repairRoomInfo, setRepairRoomInfo] = useState<RepairGetRoomInfoRes>();
  useEffect(() => {
    repairGetRoomInfoApi(roomId).then((info) => {
      setRepairRoomInfo(info);
    });
  }, [roomId]);

  return {
    repairRoomInfo,
  };
};

export default useRepairRoomInfo;
