import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './index.scss';

export interface VersionCardProps extends HTMLAttributes<HTMLDivElement> {
  list: { name: string; version: string }[];
}

export const VersionCard: FC<VersionCardProps> = (props) => {
  const { className, list, ...restProps } = props;
  return (
    <div className={classNames('version-card', className)} {...restProps}>
      {
        list.map((ctx, index) => (
          <div className="ctx" key={index}>
            <span className="ctx-name">
              {ctx.name}
              :
              {' '}
            </span>
            <span className="ctx-version">{ctx.version}</span>
          </div>
        ))
      }
    </div>
  );
};
