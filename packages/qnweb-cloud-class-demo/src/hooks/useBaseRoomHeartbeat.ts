import { useEffect, useRef, useState } from 'react';

import { RoomApi } from '@/api';

interface Params {
  roomId?: string | null;
}

/**
 * rtc房间心跳
 * @param params
 */
export const useBaseRoomHeartbeat = (params: Params) => {
  const [delay, setDelay] = useState<number>();
  const [isEnabled, setIsEnabled] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isEnabled) {
      RoomApi.baseHeartBeatApi({
        roomId: params.roomId || '',
      }).then((response) => {
        if (mountedRef.current) {
          setDelay(response.interval || 1000);
        }
      });
    }
  }, [delay, isEnabled, params.roomId]);

  useEffect(() => {
    if (delay) {
      const timer = setInterval(() => {
        RoomApi.baseHeartBeatApi({
          roomId: params.roomId || '',
        }).then((response) => {
          setDelay(response.interval || 0);
        });
      }, delay);
      return () => {
        clearInterval(timer);
      };
    }
  }, [delay, params.roomId]);

  return {
    isEnabled,
    setIsEnabled,
  };
};
