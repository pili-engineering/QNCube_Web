import { RtmManager, RongCloudRTMAdapter } from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

export interface RongIMConfig {
  appKey?: string;
  token?: string;
  chatRoomId?: string;
}

/**
 * notIn: 未加入, entering: 加入中, joined: 已加入, failed: 加入失败
 */
export type RongIMJoinState = 'notIn' | 'entering' | 'joined' | 'failed';

const useRongIM = (config: RongIMConfig) => {
  const [isConnected, setIsConnected] = useState(false);
  const [adapter, setAdapter] = useState<RongCloudRTMAdapter>();
  const [joinState, setJoinState] = useState<RongIMJoinState>('notIn');

  /**
   * 实例化
   */
  useEffect(() => {
    if (!adapter && config.appKey) {
      setAdapter(
        RtmManager.setRtmAdapter(
          new RongCloudRTMAdapter(
            config.appKey,
          ),
        ).getRtmAdapter<RongCloudRTMAdapter>(),
      );
    }
  }, [adapter, config.appKey]);

  /**
   * 建立连接
   */
  useEffect(() => {
    setJoinState('entering');
    if (adapter && config.token && !isConnected) {
      adapter.connect(config.token).then(() => {
        setIsConnected(true);
      }).catch(() => {
        setJoinState('failed');
      });
    }
  }, [adapter, config.token, isConnected]);

  /**
   * 加入聊天室
   */
  useEffect(() => {
    if (adapter && config.chatRoomId && isConnected) {
      adapter.joinChannel(config.chatRoomId).then(() => {
        setJoinState('joined');
      }).catch(() => {
        setJoinState('failed');
      });
    }
  }, [adapter, config.chatRoomId, isConnected]);

  return {
    adapter,
    joinState,
  };
};

export default useRongIM;
