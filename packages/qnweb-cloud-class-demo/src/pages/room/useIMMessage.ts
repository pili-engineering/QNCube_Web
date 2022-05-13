import { useEffect, useState } from 'react';
import { BaseMessageJson, QNRTMAdapter, RtmManager } from 'qnweb-high-level-rtc';
import { IChatMessage } from '../../components';
import { BaseUserInfo } from '../../api';

const useIMMessage = (adapter?: QNRTMAdapter, userInfo?: BaseUserInfo) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const channelMessageHandler = (receivedMessage: string) => {
      const json: BaseMessageJson = JSON.parse(receivedMessage);
      const isMe = json.data.senderId === userInfo?.accountId;
      setMessages((prevMessages) => prevMessages.concat({
        direction: isMe ? 'rtl' : 'ltr',
        avatar: json.data.avatar,
        content: json.data.msgContent,
        username: json.data.senderName,
      }));
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
  };
};

export default useIMMessage;
