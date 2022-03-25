import React, {
  FC, HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import BaseToolbar from './BaseToolbar';
import './index.scss';

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'; // 水平 | 垂直
  switchable?: boolean; // 是否可缩起/展开
  fixed?: 'top' | 'right' | 'bottom' | 'left';
  fixedClassName?: string;
}

const Toolbar: FC<ToolbarProps> = (props) => {
  const {
    fixedClassName, fixed, ...restProps
  } = props;

  const nextProps = { ...{ fixed, ...restProps } };

  return (
    fixed ? (
      <div
        className={classNames({
          'toolbar-fixed': fixed,
          [`toolbar-fixed-${fixed}`]: fixed,
        }, fixedClassName)}
      >
        <BaseToolbar {...nextProps} />
      </div>
    ) : <BaseToolbar {...nextProps} />
  );
};

export default Toolbar;
