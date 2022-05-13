import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { Popover, PopoverProps } from 'antd';
import Icon from '../icon';
import { RubberBar } from '../index';
import './index.scss';

export interface IconRubberProps extends HTMLAttributes<HTMLDivElement> {
  popover?: PopoverProps;
  direction?: 'horizontal' | 'vertical'; // 水平 | 垂直
  value?: number;
  onValueChange?: (value: number) => void;
}

const IconRubber: React.FC<IconRubberProps> = (props) => {
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
            <RubberBar
              value={value}
              onValueChange={(newValue) => onValueChange && onValueChange(newValue)}
            />
          </div>
      )}
        {...popover}
      >
        <div
          className={classNames('icon-rubber', className)}
          {...restProps}
        >
          <Icon type="icon-rubber" />
        </div>
      </Popover>
    ) : (
      <div
        className={classNames('icon-rubber', className)}
        {...restProps}
      >
        <Icon type="icon-rubber" />
      </div>
    )
  );
};

export default IconRubber;
