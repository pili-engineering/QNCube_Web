import React from 'react';
import classNames from 'classnames';
import './index.scss';

export type AngleType = 'success' | 'error';

export interface AngleProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AngleType;
}

const Angle: React.FC<AngleProps> = (props) => {
  const { className, type, ...restProps } = props;
  return (
    <div
      className={classNames('angle', {
        [`angle-${type}`]: type,
      }, className)}
      {...restProps}
    />
  );
};

export default Angle;
