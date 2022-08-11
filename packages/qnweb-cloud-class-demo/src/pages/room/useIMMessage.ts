import { useContext, useEffect, useState } from 'react';
import { BaseMessageJson, QNRTMAdapter, RtmManager } from 'qnweb-high-level-rtc';

import { IChatMessage } from '@/components';
import { UserStoreContext } from '@/store';

const useIMMessage = (adapter?: QNRTMAdapter | null) => {
  const { state: userStoreState } = useContext(UserStoreContext);
  const [messages, setMessages] = useState<BaseMessageJson[]>([]);
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);

  /**
   * 接受im消息
   */
  useEffect(() => {
    const handler = (message: string) => {
      const messageJson: BaseMessageJson = JSON.parse(message);
      setMessages((prev) => [...prev, messageJson]);
    };
    if (adapter) {
      RtmManager.addRtmChannelListener(handler);
      return () => {
        RtmManager.removeRtmChannelListener(handler);
      };
    }
  }, [adapter]);

  /**
   * 过滤出聊天的消息
   */
  useEffect(() => {
    setChatMessages(
      messages
        .filter(
          item => item.action === 'pub_chat_text'
        )
        .map((item) => {
          return {
            direction: item.data.senderId === userStoreState.userInfo?.accountId ? 'rtl' : 'ltr',
            avatar: item.data.avatar,
            content: item.data.msgContent,
            username: item.data.senderName,
          };
        })
    );
  }, [messages, userStoreState]);

  return {
    messages,
    chatMessages
  };
};

export default useIMMessage;
