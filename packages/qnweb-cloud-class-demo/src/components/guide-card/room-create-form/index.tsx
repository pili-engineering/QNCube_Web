import React from 'react';
import classNames from 'classnames';
import { Button, Form, FormProps, Input, Select } from 'antd';

import './index.scss';

export enum CloudClassType {
  /**
   * 小班课
   */
  Small = '1',
  /**
   * 1对1
   */
  OneToOne = '2',
}

export interface FormResult {
  title: string;
  nickname: string;
  classType: CloudClassType;
  password: string;
}

export interface RoomCreateFormProps extends FormProps {
  title?: string;
  loading?: boolean;
}

const prefixClassName = 'room-create-form';

const classTypeOptions: Array<{
  value: CloudClassType, label: string
}> = [
  { value: CloudClassType.Small, label: '小班课' },
  { value: CloudClassType.OneToOne, label: '1v1' },
];

export const RoomCreateForm: React.FC<RoomCreateFormProps> = (props) => {
  const { className, loading, title, style, ...restProps } = props;
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
      <Button
        className="button"
        block
        loading={loading}
        type="primary"
        shape="round"
        htmlType="submit"
      >创建教室</Button>
    </Form>
  </div>;
};
