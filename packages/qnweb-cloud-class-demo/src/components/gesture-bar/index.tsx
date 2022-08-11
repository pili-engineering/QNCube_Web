import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Icon, IconType } from '@/components';

import './index.scss';

export interface GestureBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: IconType;
  onValueChange: (value: IconType) => void;
}

export const GestureBar: React.FC<GestureBarProps> = (props) => {
  const {
    className, value, onValueChange, ...restProps
  } = props;
  const icons: IconType[] = [
    'icon-gesture', 'icon-laser-2', 'icon-laser-3',
    'icon-laser-4',
  ];
  return (
    <div className={classNames('gesture-bar', className)} {...restProps}>
      {
        icons.map((icon) => {
          const checked = icon === value;
          return (
            <div
              className={classNames('button', { checked })}
              onClick={() => onValueChange(icon)}
              key={icon}
            >
              <Icon className="button-component" type={icon} size={30}/>
            </div>
          );
        })
      }
    </div>
  );
};
