import { RtmManager, QNRTMAdapter } from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';
import { message } from 'antd';

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

const useQNIM = (config?: QNIMConfig) => {
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
      message.loading({
        content: '聊天室加入中...',
        key: 'im',
        duration: 0,
      });
      adapter.connect({
        name: config.loginAccount.name,
        password: config.loginAccount.password,
      }).then((res) => {
        console.log('connect ok', res);
        setIsConnected(true);
      }).catch((error) => {
        console.error('connected failed', error);
        message.success({
          content: `聊天室连接失败: ${JSON.stringify(error)}`,
          key: 'im',
        });
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
        message.success({
          content: '聊天室加入成功',
          key: 'im',
        });
        console.log('joinChannel ok', res);
        setJoinState('joined');
      }).catch((error: unknown) => {
        message.success({
          content: `聊天室加入失败: ${JSON.stringify(error)}`,
          key: 'im',
        });
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

export default useQNIM;
