import { useEffect } from 'react';
import { message } from 'antd';

/**
 * notIn: 未加入, entering: 加入中, joined: 已加入, failed: 加入失败
 */
export type JoinState = 'notIn' | 'entering' | 'joined' | 'failed';

/**
 * 加入房间状态
 * @param joinState
 * @param key
 */
const useToast = (joinState: JoinState, key: string) => {
  useEffect(() => {
    console.log('useToast key', key);
    console.log('useToast joinState', joinState);
    if (joinState === 'entering') {
      message.loading({
        duration: 0,
        key,
        content: `${key}加入中...`,
      });
    }
    if (joinState === 'joined') {
      message.success({
        key,
        content: `${key}加入成功`,
      });
    }
    if (joinState === 'failed') {
      message.error({
        key,
        content: `${key}加入失败`,
      });
    }
    return () => {
      message.destroy(key);
    };
  }, [joinState, key]);
};

export default useToast;
