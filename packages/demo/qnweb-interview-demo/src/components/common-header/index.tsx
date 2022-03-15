import React, { ReactElement, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Avatar, Button, Input, Popover } from 'antd';

import './index.scss';

export interface CommonHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  avatar?: string;
  button?: ReactElement;
  onSignOut: () => void;
  onUpdateUsername: (value: string) => void;
}

const UserBox: React.FC<CommonHeaderProps> = props => {
  const { name, avatar, onUpdateUsername, onSignOut } = props;
  const [username = '', setUsername] = useState(name);
  useEffect(() => {
    setUsername(username);
  }, [username]);
  return <div className="user-box">
    <div className="header">
      <Avatar size={68} src={avatar}/>
      {/*<div className='avatar-tip'>点击头像上传图片</div>*/}
    </div>
    <div className="form">
      <div className="form-item">
        <div className="label">修改用户名</div>
        <div className="content">
          <Input className="input" value={username} onChange={event => setUsername(event.target.value)}/>
          <img
            src={require('../../assets/images/icon-confirm.svg').default}
            className="confirm-btn"
            onClick={() => onUpdateUsername(username)}
            alt='icon-confirm'
          />
        </div>
      </div>
      <Button type="primary" className="sign-out" onClick={onSignOut}>退出登录</Button>
    </div>
  </div>;
};

const CommonHeader: React.FC<CommonHeaderProps> = props => {
  const { children, className, name, avatar, button, onUpdateUsername, onSignOut } = props;
  return <div className={classNames('common-header', className)}>
    <div className="header">
      <div className="header-logo">
        <img src={require('@/assets/images/logo.png').default} alt=""/>
      </div>
      <div className="header-user">
        <Popover
          overlayClassName="namespace"
          content={
            <UserBox
              onUpdateUsername={onUpdateUsername}
              onSignOut={onSignOut}
              name={name}
              avatar={avatar}
            />
          }
          trigger="click"
        >
          {avatar && <Avatar src={avatar} size={40} className="avatar"/>}
          {name && <span className="name">{name}</span>}
        </Popover>
        {button}
      </div>
    </div>
    {children}
  </div>;
};

export default CommonHeader;