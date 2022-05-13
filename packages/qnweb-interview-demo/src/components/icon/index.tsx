import React from 'react';
import classNames from 'classnames';

import { icons } from './importer';

import './index.scss';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: keyof typeof icons;
}

const Icon: React.FC<IconProps> = props => {
  const { type, className, ...restProps } = props;
  return <img
    className={classNames('icon', className)}
    alt={`icon-${type}`}
    src={icons[type]}
    {...restProps}
  />;
};

export default Icon;
