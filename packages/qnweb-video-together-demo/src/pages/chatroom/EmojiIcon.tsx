import React from 'react';
import classNames from 'classnames';
import './EmojiIcon.scss';

interface EmojiIconProps extends React.HTMLAttributes<HTMLSpanElement>{

}

const EmojiIcon: React.FC<EmojiIconProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <span className={classNames('emoji-icon', className)} {...restProps}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#DBF3FF" fillOpacity="0.12" />
        <circle cx="7" cy="13" r="2" fill="#69BCDB" />
        <circle cx="19" cy="13" r="2" fill="#69BCDB" />
        <path d="M18 20.0805C18 22.7975 14.8807 25 13.5 25C12.1193 25 9 22.7975 9 20.0805C9 17.3635 12.1193 20.6271 13.5 20.6271C14.8807 20.6271 18 17.3635 18 20.0805Z" fill="#69BCDB" />
      </svg>
    </span>
  );
};

export default EmojiIcon;
