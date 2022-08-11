import { useEffect, useReducer, useState } from 'react';
import * as QNIM from 'qnweb-im';

import { IMConfig } from '@/api';
import { useUserStore, useIMStore } from '@/store';

export interface State {
  im?: any;
}

export interface Action {
  type: 'setIM',
  payload: any;
}

export function reducer(state: State, action: Action): State {
  if (action.type === 'setIM') {
    return {
      ...state,
      im: action.payload
    };
  }
  return state;
}

export function log(...args: unknown[]): void {
  console.log('useQNIM', ...args);
}

// 登录状态
export enum LoginStatus {
  NotLogged, // 未登录
  Logging, // 登录中
  Logged, // 已登录
}

export interface GroupInfo {
  group_id: string;
  im_group_id: number;
}

export interface ChatroomManageJoinError {
  // 20017: 用户已在群组内
  // 20001: 群组未找到
  code: number;
  message: string;
  url: string;
}

export interface ChatroomManageJoinRes {
  // result 值为 'success'
  result: string;
}

export enum MessageBodyAction {
  QuitRoom = 'quit_room',
  Welcome = 'welcome',
  PubChatText = 'pub_chat_text'
}

export interface MessageBodyMsgStr {
  senderId?: string;
  senderName?: string;
  msgContent?: string;
}

export interface MessageBody {
  action: MessageBodyAction;
  // senderId、senderName、msgContent
  msgStr: MessageBodyMsgStr;
}

export interface SendMessageConfig {
  im: any;
  imGroupId?: number;
  content: MessageBody;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  type: string;
  status: number;
  timestamp: string;
  toType: string;
}

/**
 * 发送文本消息
 * @param sendMessageConfig
 */
export function sendTextMessage(sendMessageConfig: SendMessageConfig): void {
  const im = sendMessageConfig.im;
  const message = {
    content: JSON.stringify({
      action: sendMessageConfig.content.action,
      msgStr: {
        ...sendMessageConfig.content.msgStr,
      }
    }),
    gid: sendMessageConfig.imGroupId
  };
  im.sysManage.sendGroupMessage(message);
}

export const useQNIM = (config?: IMConfig) => {
  const [retryCount, setRetryCount] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, {
    im: null
  });
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(LoginStatus.NotLogged);
  const [chatroomJoined, setChatroomJoined] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { state: userStoreState } = useUserStore();
  const { state: imStoreState } = useIMStore();

  /**
   * 初始化 im
   */
  useEffect(() => {
    // 未初始化 im, 先初始化 im
    const imClient = state.im;
    if (!imClient) {
      const im = QNIM.init({
        appid: 'cigzypnhoyno',
        autoLogin: false
      });
      if (im && im.isReady && im.isReady()) {
        // 存在初始化并发问题，所以要用 try-catch-retry
        // 此处为初始化成功逻辑
        dispatch({
          type: 'setIM',
          payload: im
        });
        return;
      }
      log('未初始化成功重新初始化');
      // 未初始化成功重新初始化
      if (retryCount < 20) {
        const timer = setTimeout(() => {
          log('setRetryCount');
          setRetryCount(retryCount + 1);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      } else {
        console.error('QNIM 初始化失败，请重新初始化');
      }
    }
  }, [state.im, retryCount]);

  /**
   * 开始登录
   */
  useEffect(() => {
    const im = state.im;
    const name = imStoreState.imUsername;
    const password = imStoreState.imPassword;
    log('name', name);
    log('password', password);
    if (im && name && password) {
      log('开始登录');
      setLoginStatus(LoginStatus.Logging);
      im.login({
        name, password
      });
    }
  }, [state.im, imStoreState.imPassword, imStoreState.imUsername]);

  /**
   * im 事件监听
   */
  useEffect(() => {
    const im = state.im;

    function loginSuccess() {
      log('登录成功');
      setLoginStatus(LoginStatus.Logged);
    }

    function loginFail(errMsg: string) {
      log('登录失败', errMsg);
      setLoginStatus(LoginStatus.NotLogged);
    }

    function onGroupMessage(message: Message) {
      log('消息接收', message);
      setMessages(prevMessages => prevMessages.concat(message));
    }

    if (im) {
      log('注册 im 相关事件监听');
      im.on({ loginSuccess, loginFail, onGroupMessage });
      return () => {
        im.off({ loginSuccess, loginFail, onGroupMessage });
      };
    }
  }, [state.im]);

  /**
   * 输出登录状态
   * 加入聊天室
   */
  useEffect(() => {
    log('登录状态', loginStatus);
    const im = state.im;
    const imGroupId = config?.imGroupId;
    if (loginStatus === LoginStatus.Logged) {
      // 登录成功
      im.chatroomManage
        .join(imGroupId)
        .then((res: ChatroomManageJoinRes) => {
          log('聊天室加入成功', res);
          setChatroomJoined(true);
        })
        .catch((error: ChatroomManageJoinError) => {
          if (error.code === 20017) {
            log('聊天室加入成功');
            setChatroomJoined(true);
          } else {
            log('聊天室加入失败');
            return Promise.reject(error);
          }
        });
      return () => {
        im.chatroomManage.leave(imGroupId);
      };
    }
  }, [config?.imGroupId, loginStatus, state.im]);

  useEffect(() => {
    if (chatroomJoined) {
      const senderId = userStoreState.accountId;
      const senderName = userStoreState.nickname;
      const imGroupId = config?.imGroupId;
      sendTextMessage({
        im: state.im,
        imGroupId,
        content: {
          action: MessageBodyAction.Welcome,
          msgStr: { senderId, senderName, msgContent: '进入了房间' }
        }
      });
    }
  }, [chatroomJoined, state.im, config, userStoreState.accountId, userStoreState.nickname]);

  return {
    im: state.im,
    chatroomJoined,
    messages
  };
};
