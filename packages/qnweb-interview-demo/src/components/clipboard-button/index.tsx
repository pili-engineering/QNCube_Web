import React from 'react';
import { Button, ButtonProps } from 'antd';
import { CopyToClipboard, Props as CopyToClipboardProps } from 'react-copy-to-clipboard';

export interface ClipboardButtonProps extends CopyToClipboardProps {
  buttonProps?: ButtonProps;
  type?: 'button' | 'text';
}

/**
 * 复制粘贴按钮
 * @param props
 * @constructor
 */
const ClipboardButton: React.FC<ClipboardButtonProps> = props => {
  const { buttonProps, children, type = 'button', ...restProps } = props;
  return <CopyToClipboard
    {...restProps}
  >
    {
      type === 'button' ? <Button {...buttonProps}>{children}</Button> : children
    }
  </CopyToClipboard>;
};

export default ClipboardButton;
