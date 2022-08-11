import { Spin } from 'antd';
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import './index.scss';

export const RouterLoading: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...restProps } = props;
  return (
    <div className={classNames('loading-ctx', className)} {...restProps}>
      <Spin tip="loading..." spinning />
    </div>
  );
};
