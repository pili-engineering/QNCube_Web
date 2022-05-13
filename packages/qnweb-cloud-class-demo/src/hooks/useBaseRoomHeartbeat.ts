import { useEffect, useRef, useState } from 'react';
import * as BaseRoomApi from '@/api/baseRoomApi';

interface Params {
  roomId?: string | null;
}

/**
 * rtc房间心跳
 * @param params
 */
const useBaseRoomHeartbeat = (params: Params) => {
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
      BaseRoomApi.baseHeartBeatApi({
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
        BaseRoomApi.baseHeartBeatApi({
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

export default useBaseRoomHeartbeat;
