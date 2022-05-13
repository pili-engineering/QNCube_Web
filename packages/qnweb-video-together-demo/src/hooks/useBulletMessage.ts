import { useEffect, useState } from 'react';
import {
  BarrageSignaling, QNRTMAdapter, RtmManager,
} from 'qnweb-high-level-rtc';
import { IChatMessage } from '@/components/chat-message';
import { BaseUserInfo } from '@/api/baseApi';

const useBulletMessage = (adapter?: QNRTMAdapter, userInfo?: BaseUserInfo) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<IChatMessage>();

  useEffect(() => {
    const channelMessageHandler = (receivedMessage: string) => {
      const json: BarrageSignaling = JSON.parse(receivedMessage);
      const isMe = json.data.senderUid === userInfo?.accountId;
      if (json.action === 'living_danmu') {
        const message: IChatMessage = {
          direction: isMe ? 'rtl' : 'ltr',
          avatar: json.data.senderAvatar,
          content: json.data.content,
          username: json.data.senderName,
        };
        console.log('living_danmu message: ', message);
        setMessages((prevMessages) => prevMessages.concat(message));
        setCurrentMessage(message);
      }
    };
    if (adapter && userInfo?.accountId) {
      RtmManager.addRtmChannelListener(channelMessageHandler);
      return () => {
        RtmManager.removeRtmChannelListener(channelMessageHandler);
      };
    }
  }, [adapter, userInfo]);

  return {
    messages,
    currentMessage,
  };
};

export default useBulletMessage;
