import React, { FC } from 'react';
import { Modal, ModalProps } from 'antd';
import './index.scss';

export interface ExitClassroomModalProps extends ModalProps{}

const ExitClassroomModal: FC<ExitClassroomModalProps> = (props) => (
  <Modal
    title="退出教室"
    {...props}
    okText="确定"
    cancelText="取消"
  >
    退出教室将影响课程进度，确定要退出教室吗？
  </Modal>
);

export default ExitClassroomModal;
