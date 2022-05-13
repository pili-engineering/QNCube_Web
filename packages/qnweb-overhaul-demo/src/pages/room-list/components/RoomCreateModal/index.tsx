import React, { useState } from 'react';
import {
  Button,
  Form, Input, Modal, Select, FormProps,
} from 'antd';
import './index.scss';
import { Role } from '../../../../api';

export interface RoomCreateModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: FormProps<{ title: string; role: Role }>['onFinish'];
}

const RoomCreateModal: React.FC<RoomCreateModalProps> = (props) => {
  const { visible, onCancel, onFinish } = props;
  const [roles] = useState([
    { value: 'professor', text: '专家' },
    { value: 'staff', text: '报修人员' },
  ]);
  const [form] = Form.useForm();
  return (
    <Modal
      title="创建房间"
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="房间标题"
          rules={[{ required: true, message: '请输入房间标题' }]}
          name="title"
        >
          <Input placeholder="请输入房间标题" />
        </Form.Item>
        <Form.Item
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
          name="role"
        >
          <Select placeholder="请选择角色">
            {
              roles.map((role) => (
                <Select.Option key={role.value} value={role.value}>
                  {role.text}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <div className="form-footer">
            <Button className="form-footer--button" onClick={onCancel}>取消</Button>
            <Button className="form-footer--button" type="primary" htmlType="submit">确认</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomCreateModal;
