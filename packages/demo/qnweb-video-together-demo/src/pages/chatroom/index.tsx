import React, { useEffect, useState } from 'react';
import { NimblePicker as EmojiMartPicker, BaseEmoji, Data as EmojiData } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { BarrageSignaling } from 'qnweb-high-level-rtc';
import { getUrlQueryParams } from '@/util/url';
import useBulletMessage from '@/hooks/useBulletMessage';
import useInitBaseRoom from '@/hooks/useInitBaseRoom';
import EmojiIcon from './EmojiIcon';
import emojiData from './all.json';
import './custom-emoji-mart.scss';
import styles from './index.module.scss';
import useQNIM from '@/hooks/useQNIM';
import useToast from '@/hooks/useToast';
import { useUnmount } from 'ahooks';
import ChatroomPanel from '@/components/chatroom-panel';

const ChatRoom = () => {
  const [inputValue, setInputValue] = useState('');
  const [invitationCode] = useState(() => getUrlQueryParams('invitationCode'));
  const { stateUserInfo, imConfig } = useInitBaseRoom(invitationCode);
  const { adapter, joinState: imJoinState, chatRoomId } = useQNIM(imConfig);
  const { messages } = useBulletMessage(adapter, stateUserInfo);
  useToast(imJoinState, '聊天室');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  /**
   * 主要为了emoji输入自动滚动input内容
   */
  useEffect(() => {
    const inputElement = document.querySelector<HTMLInputElement>('#inputElement');
    if (inputElement) inputElement.scrollLeft = inputElement.scrollWidth;
  }, [inputValue]);

  /**
   * 卸载
   * 退出im聊天室
   */
  useUnmount(() => {
    if (chatRoomId) adapter?.leaveChannel(chatRoomId);
  });

  /**
   * 发送消息
   */
  const onSubmit = () => {
    if (adapter && inputValue) {
      const barrageSignaling: BarrageSignaling = {
        action: 'living_danmu',
        data: {
          content: inputValue,
          senderName: stateUserInfo?.nickname || '',
          senderUid: stateUserInfo?.accountId || '',
          senderRoomId: chatRoomId || '',
          senderAvatar: stateUserInfo?.avatar || '',
        },
      };
      const msg = JSON.stringify(barrageSignaling);
      adapter.sendChannelMsg(
        msg, imConfig?.chatRoomId || '', true,
      ).then(() => {
        setInputValue('');
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        <ChatroomPanel
          messages={messages.map((message) => ({ ...message, direction: 'ltr' }))}
          className={styles.chatroomPanel}
          input={(
            <div className={styles.inputContainer}>
              <div className={styles.inputButton}>
                <input
                  className={styles.inputElement}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="请输入消息..."
                  onFocus={() => setShowEmojiPicker(false)}
                  id="inputElement"
                  onKeyUp={(event) => { if (event.keyCode === 13) onSubmit(); }}
                />
                <EmojiIcon
                  className={styles.emojiIcon}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
              </div>
              <div className="custom-emoji-mart">
                <EmojiMartPicker
                  data={emojiData as EmojiData}
                  native
                  emojiSize={32}
                  style={{ width: '100%', display: showEmojiPicker ? 'block' : 'none' }}
                  include={['people', 'custom']}
                  onSelect={(emoji: BaseEmoji) => {
                    const value = `${inputValue} ${emoji.native} `;
                    setInputValue(value);
                  }}
                />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
