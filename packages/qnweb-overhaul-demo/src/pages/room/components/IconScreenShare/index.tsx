import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import IconShareImage from './icon-share.svg';
import './index.scss';

interface IconScreenShareProps extends HTMLAttributes<HTMLSpanElement>{

}

const IconScreenShare: React.FC<IconScreenShareProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <span className={classNames('icon-screen-share', className)} {...restProps}>
      <img src={IconShareImage} alt="IconShareImage" />
      <span className="text">屏幕共享</span>
    </span>
  );
};

export default IconScreenShare;
