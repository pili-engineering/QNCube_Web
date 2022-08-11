import React  from 'react';
import classNames from 'classnames';
import { Button, Form, FormProps, Input, Select } from 'antd';

import './index.scss';

export interface FormResult {
  title: string;
  nickname: string;
  classType: 'smallClass' | 'oneToOne';
  password: string;
}

export interface RoomCreateFormProps extends FormProps {
  title?: string;
}

const prefixClassName = 'room-create-form';

const classTypeOptions = [
  { value: 'smallClass', label: '小班课' },
  { value: 'oneToOne', label: '1v1' },
];

export const RoomCreateForm: React.FC<RoomCreateFormProps> = (props) => {
  const { className, title, style, ...restProps } = props;
  return <div className={classNames(prefixClassName, className)} style={style}>
    {title && <div className="title">{title}</div>}
    <Form {...restProps}>
      <Form.Item name="title" rules={[{ required: true, message: '请输入房间名' }]}>
        <Input placeholder="房间名"/>
      </Form.Item>
      <Form.Item name="nickname" rules={[{ required: true, message: '请输入昵称' }]}>
        <Input placeholder="昵称"/>
      </Form.Item>
      <Form.Item name="password">
        <Input placeholder="房间密码"/>
      </Form.Item>
      <Form.Item name="classType" rules={[{ required: true, message: '请选择课堂类型' }]}>
        <Select placeholder="课堂类型">
          {
            classTypeOptions.map(classType => {
              return <Select.Option key={classType.value}>
                {classType.label}
              </Select.Option>;
            })
          }
        </Select>
      </Form.Item>
      <div className="tip">课堂时长默认30分钟</div>
      <Button className="button" block type="primary" shape="round" htmlType="submit">创建教室</Button>
    </Form>
  </div>;
};
