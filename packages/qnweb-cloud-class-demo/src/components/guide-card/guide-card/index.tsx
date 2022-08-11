import React from 'react';
import classNames from 'classnames';

import cardSidePNG from '../images/card-side.png';

import './index.scss';

export type RoleSelectCardProps = React.HTMLAttributes<HTMLDivElement>;

const prefixClassName = 'guide-card';

export const GuideCard: React.FC<RoleSelectCardProps> = (props) => {
  const { className, children, ...restProps } = props;
  return <div
    className={classNames(prefixClassName, className)}
    {...restProps}
  >
    <div className="left">
      <img className="pic" src={cardSidePNG} alt="cardSidePNG"/>
    </div>
    {children && <div className="right">{children}</div>}
  </div>;
};
