import React, { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './index.scss';

interface IMRoomProps extends HTMLAttributes<HTMLDivElement>{
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

const IMRoom: React.FC<IMRoomProps> = (props) => {
  const {
    className, header, body, footer, ...restProps
  } = props;
  return (
    <div className={classNames('im-room', className)} {...restProps}>
      {header && <div className="im-room--header">{header}</div>}
      {body && <div className="im-room--body">{body}</div>}
      {footer && <div className="im-room--footer">{footer}</div>}
    </div>
  );
};

export default IMRoom;
