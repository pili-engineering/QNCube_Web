import React, {
  ReactNode,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';
import useScroll from './useScroll';
import ChatMessage, { IChatMessage } from '../chat-message';
import './index.scss';

export interface ChatroomPanelProps {
  className?: string;
  onSubmit?: () => void;
  inputValue?: string | ReadonlyArray<string> | number;
  onInputValueChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input?: ReactNode;
  messages: IChatMessage[];
}

const ChatroomPanel: React.FC<ChatroomPanelProps> = (props) => {
  const {
    className, messages, onSubmit, inputValue, onInputValueChange, input, ...restProps
  } = props;
  const { scrollToBottom } = useScroll('chatroomMessageBox');

  /**
   * 有新消息列表自动滚动到底部
   */
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, messages]);

  return (
    <div className={classNames('chatroom-panel', className)} {...restProps}>
      <div className="chatroom-message-box" id="chatroomMessageBox">
        {
          messages.map((message, index) => (
            <ChatMessage
              {...message}
              key={index}
              className="chatroom-message-box--message"
            />
          ))
        }
      </div>
      {
        input || (
          <div className="input">
            <div className="menu-bar"/>
            <Input.TextArea
              className="input-textarea"
              autoSize={false}
              value={inputValue}
              onChange={onInputValueChange}
            />
            <div className="block">
              <Button
                type="primary"
                shape="round"
                className="submit-button"
                size="small"
                onClick={onSubmit}
              >
                发送
              </Button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ChatroomPanel;
