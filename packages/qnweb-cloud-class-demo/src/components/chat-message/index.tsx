import React from 'react';
import classNames from 'classnames';
import { Avatar } from 'antd';
import './index.scss';

export interface IChatMessage {
  // ltr => left to right, rtl=> right to left
  direction?: 'ltr' | 'rtl';
  type?: 'text';
  avatar?: string;
  content?: string;
  username?: string;
}

export type ChatMessageProps = IChatMessage & {
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const {
    className, direction = 'ltr', content,
    avatar, username = '暂无昵称', ...restProps
  } = props;
  return (
    <div
      className={classNames('chat-message', `chat-message-${direction}`, className)}
      {...restProps}
    >
      <Avatar
        shape="square"
        size={40}
        src={avatar}
      >
        暂无
      </Avatar>
      <div className="chat-message-content">
        <div className="username">{username}</div>
        <div className="bubble">{content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
