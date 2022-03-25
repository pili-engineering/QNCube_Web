import { useEffect, useRef } from 'react';
import { baseHeartBeatApi } from '@/api/baseRoomApi';

const useBaseRoomHeartBeat = (roomId: string, joined: boolean) => {
  const delay = useRef<number>(0);
  useEffect(() => {
    if (joined) {
      const timer = setTimeout(() => {
        baseHeartBeatApi({
          roomId,
        }).then((response) => {
          delay.current = response.interval || 0;
        });
      }, delay.current);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [roomId, joined]);
};

export default useBaseRoomHeartBeat;
