import React, { useState } from 'react';
import { Avatar, Button, Input } from 'antd';
import iconConfirm from './icon-confirm.svg';
import './index.scss';

export interface UserBoxProps {
  username?: string;
  avatar?: string;
  onUpdateUsername?: (newUsername: string) => void;
  onSignOut?: () => void;
}

const UserBox: React.FC<UserBoxProps> = (props) => {
  const {
    avatar, username, onUpdateUsername, onSignOut,
  } = props;
  const [inputVal, setInputVal] = useState(username || '');
  /**
   * 确认修改用户昵称
   */
  const triggerUpdateUsername = () => {
    if (onUpdateUsername) {
      onUpdateUsername(inputVal);
    }
  };
  return (
    <div className="user-box">
      <Avatar size={52} src={avatar}>USER</Avatar>
      <div className="user-box--form">
        <div className="user-box--form-item">
          <div className="user-box--form-label">修改用户名</div>
          <div className="user-box--form-ctx">
            <Input
              value={inputVal}
              placeholder="请输入用户名"
              size="small"
              className="user-box--form-input"
              onChange={(event) => setInputVal(event.target.value)}
            />
            <img
              className="icon-confirm"
              src={iconConfirm}
              alt="iconConfirm"
              onClick={triggerUpdateUsername}
            />
          </div>
        </div>
      </div>
      <Button type="primary" size="small" onClick={onSignOut}>退出登录</Button>
    </div>
  );
};

export default UserBox;
