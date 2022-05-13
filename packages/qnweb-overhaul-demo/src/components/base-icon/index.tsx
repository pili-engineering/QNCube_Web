import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import './index.scss';

interface BaseIconProps extends HTMLAttributes<HTMLSpanElement>{
  src: string;
  text?: string;
}

const BaseIcon: React.FC<BaseIconProps> = (props) => {
  const {
    className, src, text, ...restProps
  } = props;
  return (
    <span className={classNames('base-icon', className)} {...restProps}>
      <img src={src} alt="base-icon-pic" />
      { text && <span className="base-icon-text">{text}</span>}
    </span>
  );
};

export default BaseIcon;
