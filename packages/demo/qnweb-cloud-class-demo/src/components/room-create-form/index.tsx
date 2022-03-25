import React, { FC, useState } from 'react';
import classNames from 'classnames';
import {
  Button,
  Form, FormProps, Input, Select,
} from 'antd';
import './index.scss';

export interface RoomCreateFormProps extends FormProps {}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export interface RoomCreateFormValues {
  title: string;
  nickname: string;
  classType: 1 | 2;
}

const RoomCreateForm: FC<RoomCreateFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [classTypes] = useState([
    { value: 1, label: '小班课' },
    { value: 2, label: '1V1' },
  ]);
  const [form] = Form.useForm();

  /**
   * 字段更新
   * @param changedFields
   */
  const onFieldsChange: FormProps['onFieldsChange'] = (changedFields) => {
    const [field] = changedFields;
    const fieldName = field.name;
    if (!Array.isArray(fieldName)) return;
    const validateFieldName = fieldName[0];
    if (validateFieldName === 'title') {
      form.setFieldsValue({
        title: field.value.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/, ''),
      });
    }
  };

  return (
    <Form
      form={form}
      className={classNames('room-create-form', className)}
      onFieldsChange={onFieldsChange}
      {...restProps}
    >
      <Form.Item
        name="title"
        label="房间名"
        rules={[{ required: true, message: '请输入房间名' }]}
        {...formItemLayout}
      >
        <Input placeholder="请输入房间名" />
      </Form.Item>
      <Form.Item
        name="nickname"
        label="昵称"
        rules={[{ required: true, message: '请输入昵称' }]}
        {...formItemLayout}
      >
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item
        name="classType"
        label="课堂类型"
        rules={[{ required: true, message: '请选择课堂类型' }]}
        {...formItemLayout}
      >
        <Select placeholder="请选择课堂类型">
          {
            classTypes.map((ct) => (
              <Select.Option value={ct.value} key={ct.value}>
                {ct.label}
              </Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="duration"
        label="课堂时长"
        rules={[{ required: true, message: '请输入课堂时长' }]}
        {...formItemLayout}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block shape="round">
          进入教室
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoomCreateForm;
