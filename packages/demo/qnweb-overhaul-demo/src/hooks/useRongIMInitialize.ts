import { useEffect, useState } from 'react';
import * as RongIMLib from '@rongcloud/imlib-v4';
import { RongIMConfig } from '../config';
import { BaseUserInfo } from '../api';

interface Config {
  imToken?: string;
  chatRoomId?: string;
  userInfo?: BaseUserInfo;
}

const useRongIMInitialize = (config: Config) => {
  const [IM, setIM] = useState<RongIMLib.IMClient>();
  const [joined, setJoined] = useState(false);
  // @ts-ignore
  const [chatRoom, setChatRoom] = useState<RongIMLib.Chatroom>();
  const [messages, setMessages] = useState<RongIMLib.IAReceivedMessage[]>([]);

  /**
   * 创建 IM 示例对象
   */
  useEffect(() => {
    if (!IM) {
      const rongIM = RongIMLib.init({ appkey: RongIMConfig.appKey });
      setIM(rongIM);
    }
  }, [IM]);

  /**
   * 获取 chatRoom
   */
  useEffect(() => {
    async function getChatRoom(im: RongIMLib.IMClient, chatRoomConfig: {
      imToken: string,
      chatRoomId: string
    }) {
      const { imToken: token, chatRoomId: id } = chatRoomConfig;
      await im.connect({ token });
      return im.ChatRoom.get({
        id,
      });
    }
    if (IM && config.chatRoomId && config.imToken) {
      getChatRoom(IM, {
        chatRoomId: config.chatRoomId,
        imToken: config.imToken,
      }).then((room) => {
        setChatRoom(room);
      });
    }
  }, [IM, config.chatRoomId, config.imToken]);

  /**
   * 加入 chatRoom
   */
  useEffect(() => {
    if (chatRoom) {
      console.log('join chatRoom');
      chatRoom.join({
        count: -1,
      }).then(() => {
        setJoined(true);
      });
    }
  }, [chatRoom]);

  /**
   * 加入房间发送消息
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (joined && IM && config.userInfo) {
      const conversation = IM.Conversation.get({
        targetId: config.chatRoomId || '',
        type: RongIMLib.CONVERSATION_TYPE.CHATROOM,
      });
      const { accountId: senderId, nickname: senderName } = config.userInfo;
      conversation.send({
        messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
        content: {
          content: JSON.stringify({
            action: 'welcome',
            msgStr: JSON.stringify({
              senderId, senderName, msgContent: '进入了房间',
            }),
          }),
        },
      });
      return () => {
        conversation.send({
          messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
          content: {
            content: JSON.stringify({
              action: 'quit_room',
              msgStr: JSON.stringify({
                senderId, senderName, msgContent: '离开了房间',
              }),
            }),
          },
        });
      };
    }
  }, [config.chatRoomId, IM, joined, config.userInfo]);

  useEffect(() => {
    if (IM) {
      IM.watch({
        /**
         * 监听消息通知
         * @param event
         */
        message: (event) => {
          const { message } = event;
          if (message.messageType === 'RC:TxtMsg') {
            setMessages(
              (prevMessages) => prevMessages.concat(message),
            );
          }
        },
      });
    }
  }, [IM]);

  return {
    IM,
    joined,
    chatRoom,
    messages,
  };
};

export default useRongIMInitialize;
