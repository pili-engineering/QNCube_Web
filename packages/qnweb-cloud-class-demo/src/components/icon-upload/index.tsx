import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './index.scss';

export interface IconUploadProps extends HTMLAttributes<HTMLDivElement> {

}

const IconUpload: React.FC<IconUploadProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <div className={classNames('icon-upload', className)} {...restProps}>
      <Icon type="icon-upload" />
    </div>
  );
};

export default IconUpload;
