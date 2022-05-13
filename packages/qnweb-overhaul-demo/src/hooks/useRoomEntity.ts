import { useEffect, useState } from 'react';
import { RoomEntity } from 'qnweb-high-level-rtc';
import { RepairJoinRoomRes } from '../api';

const useRoomEntity = (roomInfo?: RepairJoinRoomRes) => {
  const [roomEntity, setRoomEntity] = useState<RoomEntity>();
  useEffect(() => {
    if (roomInfo) {
      setRoomEntity({
        /**
         * 房间 id
         */
        roomId: roomInfo.roomInfo?.roomId,

        /**
       * 推流地
       */
        pushUri: roomInfo.publishUrl,

        /**
       * 房间 token
       */
        roomToken: roomInfo.roomToken,
        /**
         * im群
         */
        imGroupId: `${roomInfo.imConfig?.imGroupId}`,
      });
    }
  }, [roomInfo]);
  return [roomEntity];
};

export default useRoomEntity;
