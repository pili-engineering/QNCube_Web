import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';

import './index.scss';

interface IMChatInputProps extends HTMLAttributes<HTMLDivElement>{
  onSend?: () => void;
  inputVal?: string;
  onInputChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

const IMChatInput: React.FC<IMChatInputProps> = (props) => {
  const {
    className, onSend, inputVal, onInputChange, ...restProps
  } = props;
  return (
    <div className={classNames('im-room-input', className)} {...restProps}>
      <Input.TextArea
        className="im-room-input-textarea"
        placeholder="请输入文字..."
        value={inputVal}
        onChange={onInputChange}
      />
      <Button
        className="button"
        type="primary"
        onClick={onSend}
      >
        发送
      </Button>
    </div>
  );
};

export default IMChatInput;
