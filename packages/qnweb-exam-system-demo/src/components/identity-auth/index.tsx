import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { QNLocalVideoTrack } from 'qnweb-rtc';
import { QNAuthoritativeFaceComparer, QNRtcAiManager } from 'qnweb-rtc-ai';
import { Button, Input, Modal } from 'antd';
import { QNCamera } from 'qnweb-exam-sdk';

import AIApi from '@/api/AIApi';
import BoxAngle, { BoxAngleProps } from '../box-angle';
import './index.scss';

export interface IdentityAuthResult {
  fullName: string;
  idCard: string;
}

export interface IdentityAuthProps extends React.HTMLAttributes<HTMLDivElement> {
  onPass?: (result: IdentityAuthResult) => void;
}

export type IdentityAuthStatus = 'pending' | 'success' | 'failed';

/**
 * 身份认证
 * @param props
 * @constructor
 */
const IdentityAuth: React.FC<IdentityAuthProps> = (props) => {
  const { className, onPass, ...restProps } = props;

  const [fullName, setFullName] = useState('');
  const [idCardNumber, setIDCardNumber] = useState('');
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState<IdentityAuthStatus>('pending');
  const [loading, setLoading] = useState(false);

  const localCameraTrackRef = useRef<QNLocalVideoTrack>();

  // 获取aiToken
  useEffect(() => {
    AIApi.getToken().then((result) => {
      QNRtcAiManager.init(result.aiToken);
    });
  }, []);

  // 采集摄像头
  useEffect(() => {
    const camera = QNCamera.create({
      elementId: 'identity-auth-camera'
    });
    camera.start().then(() => {
      localCameraTrackRef.current = camera.cameraVideoTrack;
    });
  }, []);

  // 开始身份认证
  const onSubmit = () => {
    const localCameraTrack = localCameraTrackRef.current;
    if (localCameraTrack) {
      setLoading(true);
      QNAuthoritativeFaceComparer.run(
        localCameraTrack,
        {
          realname: fullName,
          idcard: idCardNumber,
        },
      ).then((result) => {
        if (result.response.errorcode === 0 && result.response.similarity >= 60) {
          setStatus('success');
          if (onPass) {
            onPass({
              fullName,
              idCard: idCardNumber,
            });
          }
          return Promise.resolve();
        }
        return Promise.reject(
          new Error(result.response.errormsg),
        );
      }).catch((error) => {
        setStatus('failed');
        window.console.error(error);
      }).finally(() => {
        setLoading(false);
        setVisible(false);
      });
    }
  };

  const getAngleType = (): BoxAngleProps['type'] => {
    if (status === 'success') return 'success';
    if (status === 'failed') return 'error';
    return undefined;
  };

  return (
    <div className={classNames('identity-auth', className)} {...restProps}>
      <div id="identity-auth-camera" className="identity-auth-camera"/>
      <div className="box">
        <BoxAngle type={getAngleType()}/>
        {
          status !== 'pending' && (
            <div className={classNames('auth-result-hint', {
              [`auth-result-hint--${status}`]: status,
            })}
            >
              身份认证
              {status === 'failed' && '失败'}
              {status === 'success' && '成功'}
            </div>
          )
        }
      </div>
      <div className="tip">请正视摄像头，确保光线充足</div>
      <Modal
        title="身份验证"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <div style={{ marginBottom: 10 }}>
          <Input value={fullName} placeholder="请输入姓名" onChange={(event) => setFullName(event.target.value)}/>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Input value={idCardNumber} placeholder="请输入身份证号"
                 onChange={(event) => setIDCardNumber(event.target.value)}/>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={onSubmit} loading={loading}>确认</Button>
        </div>
      </Modal>
    </div>
  );
};

export default IdentityAuth;
