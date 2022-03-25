import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
}

const Circle: React.FC<CircleProps> = (props) => {
  const {
    size = 20, color = '#000000', className,
    ...restProps
  } = props;
  return (
    <div
      className={classNames('circle', className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
      {...restProps}
    />
  );
};

export default Circle;
