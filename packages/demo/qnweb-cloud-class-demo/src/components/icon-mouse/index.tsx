import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './index.scss';

export interface IconMouseProps extends HTMLAttributes<HTMLDivElement> {

}

const IconMouse: React.FC<IconMouseProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <div className={classNames('icon-mouse', className)} {...restProps}>
      <Icon type="icon-mouse" />
    </div>
  );
};

export default IconMouse;
