import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { Popover, PopoverProps } from 'antd';

import { GeometryBar, Icon, IconType } from '@/components';

import './index.scss';

export interface IconGeometryProps extends HTMLAttributes<HTMLDivElement> {
  popover?: PopoverProps;
  direction?: 'horizontal' | 'vertical'; // 水平 | 垂直
  value?: IconType;
  onValueChange?: (value: IconType) => void;
}

export const IconGeometry: React.FC<IconGeometryProps> = (props) => {
  const {
    className, popover, direction = 'horizontal', value, onValueChange, ...restProps
  } = props;
  return (
    popover ? (
      <Popover
        trigger="click"
        placement="bottom"
        content={(
          <div className={classNames('popover-content', `popover-content--direction-${direction}`)}>
            <GeometryBar
              value={value}
              onValueChange={(newValue) => onValueChange && onValueChange(newValue)}
            />
          </div>
      )}
        {...popover}
      >
        <div className={classNames('icon-geometry', className)} {...restProps}>
          <Icon type="icon-geometry" />
        </div>
      </Popover>
    ) : (
      <div className={classNames('icon-geometry', className)} {...restProps}>
        <Icon type="icon-geometry" />
      </div>
    )
  );
};
