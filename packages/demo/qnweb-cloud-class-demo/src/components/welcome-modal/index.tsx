import React, { FC } from 'react';
import { Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import './index.scss';

export interface WelcomeModalProps extends ModalProps{
  bodyClassName?: string | undefined;
  picVisible?: boolean;
}

const WelcomeModal: FC<WelcomeModalProps> = (props) => {
  const {
    bodyClassName, children, picVisible = true, ...restProps
  } = props;
  return (
    <Modal
      visible
      footer={null}
      {...restProps}
    >
      <div className={classNames('welcome-modal--body', bodyClassName)}>
        { picVisible && <div className="pic" /> }
        {children}
      </div>
    </Modal>
  );
};

export default WelcomeModal;
