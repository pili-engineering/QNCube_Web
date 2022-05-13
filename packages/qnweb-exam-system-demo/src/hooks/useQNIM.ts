import {
  useCallback, useState,
} from 'react';
import { QNRTMAdapter, RtmManager } from 'qnweb-high-level-rtc';

type IMState = 'idle' | 'connecting' | 'connected' | 'error';

/**
 * 登录 IM 参数
 */
interface LoginParams {
  account: string;
  password: string;
}

/**
 * 登录 IM 结果
 */
interface LoginResult {
  state: IMState;
  result: unknown;
}

/**
 * 加入聊天室参数
 */
interface JoinChatroomParams {
  chatroomId: string;
}

/**
 * 加入聊天室结果
 */
interface JoinChatroomResult {
  state: IMState;
  result: unknown;
}

const useQNIM = (appKey: string) => {
  const [imClient, setIMClient] = useState<QNRTMAdapter>(() => RtmManager.setRtmAdapter(
    new QNRTMAdapter(appKey),
  ).getRtmAdapter<QNRTMAdapter>());
  const [loginResult, setLoginResult] = useState<LoginResult>({
    state: 'idle',
    result: null,
  });
  const [joinChatroomResult, setJoinChatroomResult] = useState<JoinChatroomResult>({
    state: 'idle',
    result: null,
  });

  /**
   * 登录 im
   */
  const loginIM = useCallback(
    (params: LoginParams) => imClient?.connect({
      name: params.account,
      password: params.password,
    })
      .then((result) => {
        setLoginResult({
          state: 'connected',
          result,
        });
        return result;
      })
      .catch((error) => {
        setLoginResult({
          state: 'error',
          result: error,
        });
        return Promise.reject(
          new Error(`loginIM error: ${error.message}`),
        );
      }),
    [imClient],
  );

  /**
   * 加入聊天室
   */
  const joinChatroom = useCallback(
    (params: JoinChatroomParams) => imClient?.joinChannel(params.chatroomId)
      .then((result: unknown) => {
        setJoinChatroomResult({
          state: 'connected',
          result,
        });
        return result;
      }).catch((error: Error) => {
        setJoinChatroomResult({
          state: 'error',
          result: error,
        });
        return Promise.reject(
          new Error(`joinChatroom error: ${error.message}`),
        );
      }), [imClient],
  );

  return {
    imClient,
    setIMClient,
    loginIM,
    loginResult,
    joinChatroom,
    joinChatroomResult,
  };
};

export default useQNIM;
