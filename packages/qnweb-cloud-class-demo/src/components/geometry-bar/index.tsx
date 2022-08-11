import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Icon, IconType } from '@/components';

import './index.scss';

export interface GeometryBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: IconType;
  onValueChange: (value: IconType) => void;
}

export const GeometryBar: FC<GeometryBarProps> = (props) => {
  const {
    className, value, onValueChange, ...restProps
  } = props;
  const icons: IconType[] = [
    'icon-solid-line', 'icon-arrow-line', 'icon-rectangle-line',
    'icon-circle-line',
  ];
  return (
    <div className={classNames('geometry-bar', className)} {...restProps}>
      {
        icons.map((icon) => {
          const checked = icon === value;
          return (
            <div
              className={classNames('button', { checked })}
              onClick={() => onValueChange(icon)}
              key={icon}
            >
              <Icon className="button-component" type={icon} size={30} />
            </div>
          );
        })
      }
    </div>
  );
};
