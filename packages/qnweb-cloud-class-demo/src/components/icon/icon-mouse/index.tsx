import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Icon } from '../icon';

import './index.scss';

export const IconMouse: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...restProps } = props;
  return (
    <div className={classNames('icon-mouse', className)} {...restProps}>
      <Icon type="icon-mouse" />
    </div>
  );
};
