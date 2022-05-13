import { useCallback, useRef, useState } from 'react';
import { useInterval } from 'ahooks';

import * as BaseRoomApi from '@/api/BaseRoomApi';

const useRoomHeart = () => {
  const [enabled, setEnabled] = useState(false);
  const [delay, setDelay] = useState<number>();
  const roomIdRef = useRef<string>();

  /**
   * 轮训
   */
  useInterval(() => {
    const roomId = roomIdRef.current;
    if (roomId) {
      BaseRoomApi.baseHeartBeatApi({
        roomId
      }).then(result => {
        setDelay(result.interval);
      });
    }
  }, delay);

  /**
   * 开启
   */
  const enableHeart = useCallback((roomId: string) => {
    roomIdRef.current = roomId;
    return BaseRoomApi.baseHeartBeatApi({
      roomId
    }).then(result => {
      setEnabled(true);
      setDelay(result.interval);
    });
  }, []);

  /**
   * 关闭
   */
  const disableHeart = useCallback(() => {
    setEnabled(false);
    setDelay(undefined);
  }, []);

  return {
    enabled,
    enableHeart,
    disableHeart
  };
};

export default useRoomHeart;
