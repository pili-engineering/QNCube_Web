import React from 'react';
import classNames from 'classnames';
import Circle from '../circle';
import './index.scss';

export interface MultiColorCircleBarProps extends React.HTMLAttributes<HTMLDivElement>{
  value?: string;
  onValueChange: (value: string) => void;
}

const MultiColorCircleBar: React.FC<MultiColorCircleBarProps> = (props) => {
  const {
    className, value, onValueChange, ...restProps
  } = props;
  const colors = [
    '#000000', '#1F9F8C', '#F44336',
    '#FFFFFF', '#FFC000', '#0086D0',
  ];
  return (
    <div className={classNames('multi-color-circle-bar', className)} {...restProps}>
      {
        colors.map((color) => {
          const checked = color === value;
          return (
            <Circle
              className={classNames('button-component', { checked })}
              key={color}
              color={color}
              onClick={() => onValueChange(color)}
            />
          );
        })
      }
    </div>
  );
};

export default MultiColorCircleBar;
