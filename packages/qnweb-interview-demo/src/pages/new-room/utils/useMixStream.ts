import { useEffect, useMemo } from 'react';
import { useRoomStore } from '@/store';

interface Params {
  /**
   * 是否开启合流
   */
  enabled: boolean;
  /**
   * 是否需要start来开始合流
   */
  isNeedStart?: boolean;
  /**
   * 播放队列
   */
  queue: {
    uid: string,
    type: 'screen' | 'camera',
    isOpen: boolean,
  }[];
}

export const useMixStream = (params: Params): void => {
  const { state: roomStoreState } = useRoomStore();
  const roomClient = useMemo(() => roomStoreState.roomClient, [roomStoreState.roomClient]);

  /**
   * 开始合流任务
   */
  useEffect(() => {
    if (!params.enabled) return;
    if (!roomClient) return;
    if (!params.isNeedStart) return;
    console.log('useMixStream 开始合流任务')
    roomClient.getMixStreamTool().startMixStreamJob({
      width: 640,
      height: 400,
    });
  }, [params.enabled, params.isNeedStart, roomClient]);

  /**
   * 合大屏流
   */
  useEffect(() => {
    if (!params.enabled) return;
    if (!roomClient) return;
    const large = params.queue[0];
    if (!large) return;
    const options = {
      x: 0,
      y: 0,
      width: 640,
      height: 400,
    };
    console.log('useMixStream 合大屏流')
    if (large.type === 'camera') {
      roomClient.getMixStreamTool().updateUserCameraMergeOptions(large.uid, options);
    }
    if (large.type === 'screen') {
      roomClient.getMixStreamTool().updateUserScreenMergeOptions(large.uid, options);
    }
  }, [params.enabled, params.queue, roomClient]);

  /**
   * 合小屏流
   */
  useEffect(() => {
    if (!params.enabled) return;
    if (!roomClient) return;
    const small = params.queue[1];
    if (!small) return;
    const option = {
      x: 500,
      y: 40,
      width: 100,
      height: 100,
      zOrder: 1
    };
    console.log('useMixStream 合小屏流')
    if (small.type === 'camera') {
      roomClient.getMixStreamTool().updateUserCameraMergeOptions(small.uid, option);
    }
    if (small.type === 'screen') {
      roomClient.getMixStreamTool().updateUserScreenMergeOptions(small.uid, option);
    }
  }, [params.enabled, params.queue, roomClient]);
};

