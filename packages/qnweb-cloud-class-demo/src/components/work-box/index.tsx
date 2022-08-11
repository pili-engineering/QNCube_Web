import React from 'react';
import classNames from 'classnames';
import { Popover } from 'antd';

import { Icon, IconProps } from '@/components';

import './index.scss';

export interface WorkBoxProps extends React.HTMLAttributes<HTMLSpanElement> {
  onIconScreenShareClick?: IconProps['onClick'];
}

export const WorkBox: React.FC<WorkBoxProps> = (props) => {
  const { className, onIconScreenShareClick, ...restProps } = props;
  return <Popover
    trigger="click"
    content={
      <div className="work-box-content">
        <Icon
          type="icon-screen-share"
          text="屏幕共享"
          onClick={onIconScreenShareClick}
        />
      </div>
    }
  >
    <Icon
      className={classNames('work-box', className)}
      type="icon-tool-box"
      {...restProps}
    />
  </Popover>;
};
