import { useEffect, useMemo, useState } from 'react';
import { isPubSignaling, PubSignaling, RtmManagerLister } from 'qnweb-high-level-rtc';

import { useIMStore, useRoomStore } from '@/store';

/**
 * 解析json字符串
 * @param value
 */
const jsonParseSafe = (value?: string) => {
  try {
    return JSON.parse(value || '');
  } catch (error) {
    return {
      value,
      error
    };
  }
};

interface Params {
  initMessage?: boolean;
  username?: string;
  imGroupId?: string;
}

interface Message {
  timestamp: number;
  username: string;
  content: string;
}

const generateMessage = (params: {
  action: 'welcome' | 'quit_room',
  senderId: string,
  senderName: string,
}) => {
  const { action, senderId, senderName } = params;
  const typeToContent: Record<'welcome' | 'quit_room', string> = {
    welcome: '进入了房间',
    quit_room: '离开了房间'
  };
  const message: PubSignaling = {
    action,
    data: {
      timestamp: Date.now(),
      senderId,
      senderName,
      msgContent: typeToContent[action]
    }
  };
  return {
    message: JSON.stringify(message),
  };
};

export const useIM = (params?: Params): Record<'messages', Message[]> => {
  const { state: imStoreState } = useIMStore();
  const imClient = useMemo(() => imStoreState.imClient, [imStoreState.imClient]);
  const { state: roomStoreState } = useRoomStore();
  const roomClient = useMemo(() => roomStoreState.roomClient, [roomStoreState.roomClient]);

  const currentUserId = useMemo(() => roomClient?.currentUserId, [roomClient?.currentUserId]);
  const [messages, setMessages] = useState<Message[]>([]);

  /**
   * im消息监听数据处理
   */
  useEffect(() => {
    const listener: RtmManagerLister = (msg: string, peerId: string) => {
      console.log('useIM listener', msg, peerId);
      const message: PubSignaling = jsonParseSafe(msg);
      if (isPubSignaling(message)) {
        const timestamp = message.data.timestamp || 0;
        const content = message.data.msgContent;
        const username = message.data.senderName;
        setMessages(messages => messages.concat({
          timestamp,
          content,
          username
        }));
      }
    };
    if (imClient) {
      imClient.addRtmChannelListener(listener);
      return () => {
        imClient.removeRtmChannelListener(listener);
      };
    }
  }, [imClient]);

  /**
   * 进入/离开房间发送im消息
   */
  useEffect(() => {
    const initMessage = params?.initMessage;
    const imGroupId = params?.imGroupId;
    const username = params?.username;
    if (initMessage && imGroupId && username && currentUserId && imClient) {
      const result = generateMessage({
        action: 'welcome',
        senderId: currentUserId,
        senderName: username
      });
      imClient.sendChannelMsg(result.message, imGroupId, true);
      return () => {
        const result = generateMessage({
          action: 'quit_room',
          senderId: currentUserId,
          senderName: username
        });
        imClient.sendChannelMsg(result.message, imGroupId, true);
      };
    }
  }, [
    params?.initMessage, params?.username, params?.imGroupId,
    currentUserId, imClient
  ]);

  return {
    messages,
  };
};
