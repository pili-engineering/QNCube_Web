import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BaseMessageJson } from 'qnweb-high-level-rtc';
import './index.scss';

export type OnInputKeyEnterHandler = (value: string) => void;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  list: Array<BaseMessageJson>;
  onInputKeyEnter: OnInputKeyEnterHandler;
  chatInputShow: boolean;
}

const Chat = (props: Props) => {
  const { className, list, onInputKeyEnter, chatInputShow, ...restProps } = props;
  const [inputVal, setInputVal] = useState('');
  const chatMessage = useRef<HTMLDivElement>(null);

  /**
   * 回车触发
   * @param event
   */
  const onKeyEnter: React.KeyboardEventHandler<HTMLInputElement> = event => {
    const isEnterKey = event.key === 'Enter';
    if (isEnterKey) {
      onInputKeyEnter(inputVal);
      setInputVal('');
    }
  };

  /**
   * 自动滚动到底部
   */
  useEffect(() => {
    const scrollEle = chatMessage.current;
    if (scrollEle) {
      scrollEle.scrollTop = scrollEle.scrollHeight;
    }
  }, [list]);

  return <div className={classNames('chat', className)} {...restProps}>
    <div className="message-list" ref={chatMessage}>
      {
        list.map((messageCtx, index) => {
          return <div key={index} className="message-ctx">
            {messageCtx.data.senderName}：{messageCtx.data.msgContent}
          </div>;
        })
      }
    </div>
    {
      chatInputShow ? <input
        className="chat-input"
        value={inputVal}
        onChange={event => setInputVal(event.target.value)}
        onKeyUp={onKeyEnter}
        placeholder="请输入文字......"
      /> : null
    }
  </div>;
};

export default Chat;