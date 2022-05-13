import React, { FC, useState } from 'react';
import {
  Button, Form, FormProps, Select,
} from 'antd';
import classNames from 'classnames';
import './index.scss';

export interface RoleSelectionFormProps extends FormProps {}

export interface RoleSelectionFormValues {
  role: 'student' | 'teacher'
}

const RoleSelectionForm: FC<RoleSelectionFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [roles] = useState([
    { value: 'teacher', label: '老师' },
    { value: 'student', label: '学生' },
  ]);
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      className={classNames('role-selection-form', className)}
      layout="vertical"
      {...restProps}
    >
      <h3 className="title">欢迎来到牛课堂！</h3>
      <Form.Item
        name="role"
        label="请选择您的角色:"
        rules={[{ required: true, message: '请选择您的角色' }]}
      >
        <Select placeholder="请选择您的角色">
          {
            roles.map((role) => (
              <Select.Option value={role.value} key={role.value}>
                {role.label}
              </Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block shape="round">
          确认
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoleSelectionForm;
