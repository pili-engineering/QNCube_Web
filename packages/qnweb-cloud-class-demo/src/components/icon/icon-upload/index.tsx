import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Icon } from '../icon';

import './index.scss';

export const IconUpload: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...restProps } = props;
  return (
    <div className={classNames('icon-upload', className)} {...restProps}>
      <Icon type="icon-upload" />
    </div>
  );
};
