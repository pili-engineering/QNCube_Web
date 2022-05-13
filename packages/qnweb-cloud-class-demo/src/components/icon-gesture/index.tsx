import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { Popover, PopoverProps } from 'antd';
import Icon, { IconType } from '../icon';
import { GestureBar } from '../index';
import './index.scss';

export interface IconGestureProps extends HTMLAttributes<HTMLDivElement> {
  popover?: PopoverProps;
  direction?: 'horizontal' | 'vertical'; // 水平 | 垂直
  value?: IconType;
  onValueChange?: (value: IconType) => void;
}

const IconGesture: React.FC<IconGestureProps> = (props) => {
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
            <GestureBar
              value={value}
              onValueChange={(newValue) => onValueChange && onValueChange(newValue)}
            />
          </div>
      )}
        {...popover}
      >
        <div className={classNames('icon-gesture', className)} {...restProps}>
          <Icon type="icon-gesture" />
        </div>
      </Popover>
    ) : (
      <div className={classNames('icon-gesture', className)} {...restProps}>
        <Icon type="icon-gesture" />
      </div>
    )
  );
};

export default IconGesture;
