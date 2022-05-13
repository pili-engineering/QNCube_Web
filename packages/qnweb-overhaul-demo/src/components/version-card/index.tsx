import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import './index.scss';

interface VersionCardProps extends HTMLAttributes<HTMLDivElement>{
  list: {name: string; version: string}[];
}

const VersionCard: React.FC<VersionCardProps> = (props) => {
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

export default VersionCard;
