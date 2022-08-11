import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import './index.scss';

export interface RippleProps {
  className?: string;
  color?: string;
  size?: number;
  style?: CSSProperties;
}

const prefixClassName = 'ripple';


export const Ripple: React.FC<RippleProps> = (props) => {
  const { className, size = 160, color = '#CCEEFA', style } = props;
  return <div
    className={classNames(prefixClassName, className)}
    style={{ width: size + 'px', height: size + 'px', ...style}}
  >
    <div
      className="ripple-inner"
      style={{
        width: size + 'px',
        height: size + 'px',
        marginLeft: -size / 2 + 'px',
        marginTop: -size / 2 + 'px',
        backgroundColor: color,
      }}
    />
  </div>;
};
