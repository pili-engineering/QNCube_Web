import { Spin } from 'antd';
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import './index.scss';

interface RouterLoadingProps extends HTMLAttributes<HTMLDivElement>{

}

const RouterLoading: React.FC<RouterLoadingProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <div className={classNames('loading-ctx', className)} {...restProps}>
      <Spin tip="loading..." spinning />
    </div>
  );
};

export default RouterLoading;
