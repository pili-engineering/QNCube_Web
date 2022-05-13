import React, { useEffect } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { ChatPanelInput, ChatPanelInputProps } from './chat-panel-input';
import { ChatPanelInfo, ChatPanelInfoProps } from './chat-panel-info';

import './index.scss';

export interface Message {
  timestamp: number;
  username: string;
  content: string;
}

export type ChatPanelProps = {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 自动滚动到底部
   */
  autoScroll?: boolean;
  /**
   * 消息列表
   */
  messages?: Message[];
  /**
   * 时间格式化模板
   */
  dateFormatTemplate?: string;
} & {
  infoProps?: ChatPanelInfoProps;
} & {
  inputProps?: ChatPanelInputProps;
};

const prefixCls = 'chat-panel';

export const ChatPanel: React.FC<ChatPanelProps> = (props) => {
  const {
    className, infoProps, inputProps,
    autoScroll = true, messages = [],
    dateFormatTemplate = 'HH:mm:ss',
    ...restProps
  } = props;

  const bodyRef = React.useRef<HTMLDivElement>(null);

  /**
   * 自动滚动到底部
   */
  useEffect(() => {
    if (autoScroll) {
      const ele = bodyRef.current;
      if (ele) {
        ele.scrollTop = ele.scrollHeight;
      }
    }
  }, [autoScroll, messages]);

  return <div className={classNames(prefixCls, className)} {...restProps}>
    <ChatPanelInfo {...infoProps}/>

    <div className="body" ref={bodyRef}>
      {
        messages.map((message, index) => {
          return <div className="message-ctx" key={index}>
            <span className="date">{dayjs(message.timestamp).format(dateFormatTemplate)}</span>
            <span className="username">{message.username}：</span>
            <span className="content">{message.content}</span>
          </div>;
        })
      }
    </div>

    <ChatPanelInput {...inputProps}/>
  </div>;
};

