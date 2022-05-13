import React from 'react';
import classNames from 'classnames';
import Angle, { AngleType } from '../angle';
import './index.scss';

export interface BoxAngleProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AngleType;
}

const BoxAngle: React.FC<BoxAngleProps> = (props) => {
  const { className, type, ...restProps } = props;
  return (
    <div className={classNames('box-angle', className)} {...restProps}>
      <Angle type={type} className="box-angle--left-top" />
      <Angle type={type} className="box-angle--right-top" />
      <Angle type={type} className="box-angle--right-bottom" />
      <Angle type={type} className="box-angle--left-bottom" />
    </div>
  );
};

export default BoxAngle;
