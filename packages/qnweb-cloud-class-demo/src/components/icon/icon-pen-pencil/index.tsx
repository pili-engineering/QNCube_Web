import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { Popover, PopoverProps } from 'antd';

import { MultiColorCircleBar, MultiSizeCircleBar, Icon } from '@/components';

import './index.scss';

export interface CircleBarConfig {
  color?: string;
  size?: number;
}

export interface IconPenPencilProps extends HTMLAttributes<HTMLDivElement> {
  popover?: PopoverProps;
  direction?: 'horizontal' | 'vertical'; // 水平 | 垂直
  value?: CircleBarConfig;
  onValueChange?: (value: CircleBarConfig) => void;
}

export const IconPenPencil: React.FC<IconPenPencilProps> = (props) => {
  const {
    className, popover, direction = 'horizontal', value, onValueChange, ...restProps
  } = props;
  const onChange = (key: 'color' | 'size', newValue: string | number) => {
    if (onValueChange) {
      onValueChange({ [key]: newValue });
    }
  };
  return (
    popover ? (
      <Popover
        trigger="click"
        placement="bottom"
        content={(
          <div className={classNames('popover-content', `popover-content--direction-${direction}`)}>
            <MultiColorCircleBar
              value={value?.color}
              onValueChange={(newValue) => onChange('color', newValue)}
            />
            <MultiSizeCircleBar
              value={value?.size}
              onValueChange={(newValue) => onChange('size', newValue)}
            />
          </div>
        )}
        {...popover}
      >
        <div className={classNames('icon-pen-pencil', className)} {...restProps}>
          <Icon type="icon-pen-pencil" />
        </div>
      </Popover>
    ) : (
      <div className={classNames('icon-pen-pencil', className)} {...restProps}>
        <Icon type="icon-pen-pencil" />
      </div>
    )
  );
};
