import React from 'react';
import classNames from 'classnames';
import Circle from '../circle';
import './index.scss';

export interface MultiSizeCircleBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  onValueChange: (value: number) => void;
}

const MultiSizeCircleBar: React.FC<MultiSizeCircleBarProps> = (props) => {
  const {
    className, value, onValueChange, ...restProps
  } = props;
  const sizes = [5, 10, 15, 20, 25, 30];
  return (
    <div className={classNames('multi-size-circle-bar', className)} {...restProps}>
      {
        sizes.map((size) => {
          const checked = size === value;
          return (
            <div
              className={classNames('button', { checked })}
              key={size}
              onClick={() => onValueChange(size)}
            >
              <Circle className="button-component" size={size} />
            </div>
          );
        })
      }
    </div>
  );
};

export default MultiSizeCircleBar;
