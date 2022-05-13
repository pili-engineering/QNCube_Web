import React, { HTMLAttributes, ReactNode, ReactNodeArray } from 'react';
import { Avatar, Popover } from 'antd';
import logo from './logo.png';
import './index.scss';

export interface HeaderPanelProps extends HTMLAttributes<HTMLDivElement>{
  username?: string;
  avatar?: string;
  popoverContent?: ReactNode;
  buttons?: ReactNodeArray;
}

const HeaderPanel: React.FC<HeaderPanelProps> = (props) => {
  const {
    username, avatar, popoverContent, buttons, ...restProps
  } = props;
  return (
    <div className="header-panel" {...restProps}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header-panel--user">
        <Popover content={popoverContent} trigger={popoverContent ? 'click' : ''}>
          <Avatar className="avatar" src={avatar}>USER</Avatar>
          <span className="name">{username || '暂无昵称'}</span>
        </Popover>
        {
          buttons?.map((btn, index) => {
            if (React.isValidElement(btn)) {
              return React.cloneElement(btn, {
                key: index,
              });
            }
            return btn;
          })
        }
      </div>
    </div>
  );
};

export default HeaderPanel;
