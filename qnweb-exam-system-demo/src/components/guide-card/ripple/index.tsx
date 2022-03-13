import React, { CSSProperties } from 'react';
import './index.scss';
import classNames from 'classnames';

export interface RippleProps {
  className?: string;
  color?: string;
  size?: number;
  style?: CSSProperties;
}

const prefixClassName = 'ripple';


const Ripple: React.FC<RippleProps> = (props) => {
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

export default Ripple;
