import React, { FC } from 'react';
import { Modal, ModalProps } from 'antd';

import './index.scss';

export const ExitClassroomModal: FC<ModalProps> = (props) => (
  <Modal
    title="退出教室"
    {...props}
    okText="确定"
    cancelText="取消"
  >
    退出教室将影响课程进度，确定要退出教室吗？
  </Modal>
);
