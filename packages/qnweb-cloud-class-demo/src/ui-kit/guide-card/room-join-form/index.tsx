import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { Button, Form, Input } from 'antd';
import './index.scss';

export interface RoomJoinFormProps {
  className?: string;
  style?: CSSProperties;
  title?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onOk: React.MouseEventHandler<HTMLElement>;
}

const prefixClassName = 'room-join-form';

const RoomJoinForm: React.FC<RoomJoinFormProps> = (props) => {
  const { className, title, value, onChange, onOk, ...restProps } = props;
  return <div className={classNames(prefixClassName, className)} {...restProps}>
    {title && <div className="title">{title}</div>}
    <Form>
      <Form.Item>
        <Input placeholder="房间密钥" value={value} onChange={onChange}/>
      </Form.Item>
      <Button type="primary" shape="round" block onClick={onOk}>进入教室</Button>
    </Form>
  </div>;
};

export default RoomJoinForm;
