import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './index.scss';

export interface RubberBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  onValueChange: (value: number) => void;
}

const RubberBar: FC<RubberBarProps> = (props) => {
  const {
    className, value, onValueChange, ...restProps
  } = props;
  const icons = [10, 15, 20, 25, 30];
  return (
    <div className={classNames('rubber-bar', className)} {...restProps}>
      {
        icons.map((size) => {
          const checked = size === value;
          return (
            <div
              className={classNames('button', { checked })}
              onClick={() => onValueChange(size)}
              key={size}
            >
              <Icon
                className="button-component"
                size={size}
                type="icon-rubber-30"
              />
            </div>
          );
        })
      }
    </div>
  );
};

export default RubberBar;
