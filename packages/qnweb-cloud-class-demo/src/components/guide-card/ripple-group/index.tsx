import React from 'react';
import classNames from 'classnames';

import { Ripple } from '../ripple';

import './index.scss';

export interface RippleGroupProps {
  className?: string;
}

const prefixClassName = 'ripple-group'

export const RippleGroup: React.FC<RippleGroupProps> = (props) => {
  const { className } = props;
  return <div className={classNames(prefixClassName, className)}>
    <Ripple
      className='ripple'
      size={520}
      color='#40BFED'
    />
    <Ripple
      className='ripple'
      size={380}
      color='#99DDF5'
    />
    <Ripple
      className='ripple'
      size={240}
      color='#CCEEFA'
    />
  </div>
}
