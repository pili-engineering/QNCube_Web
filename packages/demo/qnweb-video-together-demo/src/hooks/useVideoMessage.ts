import { useEffect, useState } from 'react';
import { ChannelAttributesChangeJson, QNRTMAdapter, RtmManager } from 'qnweb-high-level-rtc';
import { BaseUserInfo } from '@/api/baseApi';

const useBulletMessage = (adapter?: QNRTMAdapter, userInfo?: BaseUserInfo) => {
  const [messages, setMessages] = useState<ChannelAttributesChangeJson[]>([]);
  const [currentMessage, setCurrentMessage] = useState<ChannelAttributesChangeJson>();

  useEffect(() => {
    const channelMessageHandler = (receivedMessage: string) => {
      const json: ChannelAttributesChangeJson = JSON.parse(receivedMessage);
      if (json.action === 'channelAttributes_change' && json.data.key === 'watch_movie_together') {
        console.log('channelAttributes_change', json);
        setMessages((prevMessages) => prevMessages.concat(json));
        setCurrentMessage(json);
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
