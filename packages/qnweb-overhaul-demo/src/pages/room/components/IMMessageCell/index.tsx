import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import './index.scss';

interface IMMessageCellProps extends HTMLAttributes<HTMLDivElement>{
  message: IMessage;
}

export interface IMessage {
  action?: string;
  data?: {
    senderId?: string;
    senderName?: string;
    msgContent?: string;
    timestamp?: number;
  }
}

const IMMessageCell: React.FC<IMMessageCellProps> = (props) => {
  const { className, message, ...restProps } = props;
  return (
    <div className={classNames('message-cell', className)} {...restProps}>
      {
        message.data?.timestamp ? <span className="datetime">{dayjs(message.data.timestamp).format('HH:mm:ss')}</span> : null
      }
      <span className="info">
        <span className="username">
          {message.data?.senderName}
          :
          {' '}
        </span>
        <span className="message-text">{message.data?.msgContent}</span>
      </span>
    </div>
  );
};

export default IMMessageCell;
