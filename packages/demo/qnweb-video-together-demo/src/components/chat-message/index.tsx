import React from 'react';
import classNames from 'classnames';
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
    className, direction = 'ltr', content, ...restProps
  } = props;
  return (
    <div
      className={classNames('chat-message', `chat-message-${direction}`, className)}
      {...restProps}
    >
      <div className="chat-message-content">
        <div className="bubble">{content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
