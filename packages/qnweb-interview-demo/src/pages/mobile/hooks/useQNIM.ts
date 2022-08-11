import { RtmManager, QNRTMAdapter } from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

export interface QNIMConfig {
  appKey?: string;
  loginAccount?: {
    name?: string;
    password?: string;
  },
  chatRoomId?: string;
}

/**
 * notIn: 未加入, entering: 加入中, joined: 已加入, failed: 加入失败
 */
export type QNIMJoinState = 'notIn' | 'entering' | 'joined' | 'failed';

export const useQNIM = (config?: QNIMConfig) => {
  const [isConnected, setIsConnected] = useState(false);
  const [adapter, setAdapter] = useState<QNRTMAdapter>();
  const [joinState, setJoinState] = useState<QNIMJoinState>('notIn');

  /**
   * 实例化
   */
  useEffect(() => {
    if (!adapter && config?.appKey) {
      setAdapter(
        RtmManager.setRtmAdapter(
          new QNRTMAdapter(
            config.appKey,
          ),
        ).getRtmAdapter<QNRTMAdapter>(),
      );
    }
  }, [adapter, config?.appKey]);

  /**
   * 建立连接
   */
  useEffect(() => {
    setJoinState('entering');
    if (adapter && config?.loginAccount?.name && config?.loginAccount.password && !isConnected) {
      adapter.connect({
        name: config.loginAccount.name,
        password: config.loginAccount.password,
      }).then((res) => {
        console.log('connect ok', res);
        setIsConnected(true);
      }).catch((error) => {
        console.error('connected failed', error);
        setJoinState('failed');
      });
    }
  }, [adapter, config?.loginAccount?.name, config?.loginAccount?.password, isConnected]);

  /**
   * 加入聊天室
   */
  useEffect(() => {
    if (adapter && config?.chatRoomId && isConnected) {
      console.log('config.chatRoomId', config.chatRoomId);
      adapter.joinChannel(config.chatRoomId).then((res: unknown) => {
        console.log('joinChannel ok', res);
        setJoinState('joined');
      }).catch((error: unknown) => {
        console.error(error);
        setJoinState('failed');
      });
    }
  }, [adapter, config?.chatRoomId, isConnected]);

  return {
    adapter,
    joinState,
  };
};

