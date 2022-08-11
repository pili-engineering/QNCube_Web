import React from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';

import './index.scss';

export interface ChatPanelInputProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 输入框的内容
   */
  value?: string;
  /**
   * 输入框内容发生变化的回调
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * 发送
   */
  onSubmit?: React.MouseEventHandler<HTMLElement>;
}

const prefixCls = 'chat-panel-input';

/**
 * 聊天框组件
 * @param props
 * @constructor
 */
export const ChatPanelInput: React.FC<ChatPanelInputProps> = (props) => {
  const { className, value, onChange, onSubmit, ...restProps } = props;
  return <div className={classNames(prefixCls, className)} {...restProps}>
    <Input.TextArea
      placeholder="请输入文字..."
      className="input"
      value={value}
      onChange={onChange}
    />
    <div className="buttons">
      <Button type="primary" onClick={onSubmit}>发送</Button>
    </div>
  </div>;
};
