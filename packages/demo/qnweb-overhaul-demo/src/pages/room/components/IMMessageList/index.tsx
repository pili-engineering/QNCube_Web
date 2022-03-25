import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import IMMessageCell, { IMessage } from '../IMMessageCell';

interface IMMessageListProps extends HTMLAttributes<HTMLDivElement>{
  messages: IMessage[];
}

const IMMessageList: React.FC<IMMessageListProps> = (props) => {
  const { className, messages, ...restProps } = props;
  return (
    <div className={classNames('message-list', className)} {...restProps}>
      {
        messages.map((message, index) => (
          <IMMessageCell
            key={index}
            message={message}
          />
        ))
      }
    </div>
  );
};

export default IMMessageList;
