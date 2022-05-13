import React, { HTMLAttributes, ReactNodeArray } from 'react';
import classNames from 'classnames';
import './index.scss';

interface RTCRoomProps extends HTMLAttributes<HTMLDivElement>{
  title: string;
  footer?: ReactNodeArray;
}

const RTCRoom: React.FC<RTCRoomProps> = (props) => {
  const {
    className, title, footer, children, ...restProps
  } = props;
  return (
    <div className={classNames('rtc-room', className)} {...restProps}>
      <div className="rtc-room--header">{title}</div>
      <div className="rtc-room--body">{children}</div>
      {
        footer && (
          <div className="rtc-room--footer">
            {
              footer.map((node, index) => {
                if (React.isValidElement(node)) return React.cloneElement(node, { key: index });
                return node;
              })
            }
          </div>
        )
      }
    </div>
  );
};

export default RTCRoom;
