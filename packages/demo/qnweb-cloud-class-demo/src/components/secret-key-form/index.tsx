import React, { FC } from 'react';
import classNames from 'classnames';
import {
  Button, Form, FormProps, Input,
} from 'antd';
import './index.scss';

export interface SecretKeyFormProps extends FormProps {}

export interface SecretKeyFormValues {
  roomId: string;
}

const SecretKeyForm: FC<SecretKeyFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      className={classNames('secret-key-form', className)}
      layout="vertical"
      {...restProps}
    >
      <h3 className="title">欢迎来到牛课堂！</h3>
      <Form.Item
        name="roomId"
        label="请输入房间秘钥:"
        rules={[{ required: true, message: '请输入房间秘钥' }]}
      >
        <Input placeholder="请输入房间秘钥" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block shape="round">
          进入教室
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SecretKeyForm;
