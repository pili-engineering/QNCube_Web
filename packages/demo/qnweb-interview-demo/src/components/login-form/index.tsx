import React, { HTMLAttributes, useRef } from 'react';
import { Form, Input } from 'antd';
import CaptchaButton, { InternalChangeEventHandler } from '../captcha-button';
import { Callbacks } from 'rc-field-form/lib/interface';
import { LoadingButton } from '../button';
import { phoneNumberUtil } from '../../utils';
import Icon from '../icon';
import { linkConfig } from '../../config';
import VConsole  from 'vconsole';
import './index.scss'

export interface LoginData {
  phone: string;
  smsCode: string;
  checked: boolean;
}

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
  tip?: string;
  onFinish?: Callbacks['onFinish'];
  onFinishFailed?: Callbacks['onFinishFailed'];
  onFormChange: (value: LoginData) => void; 
  data: LoginData
  onGetCaptcha: InternalChangeEventHandler;
  onOk: (data: LoginData) => void;
  onCheck: () => void;
}

const LoginForm: React.FC<LoginFormProps> = props => {
  const { tip, onFinish, onFinishFailed, onFormChange, data, onGetCaptcha, onOk, onCheck } = props;
  const debug = useRef<VConsole>();
  function onOpenDebug() {
    if (!debug.current) {
      debug.current = new VConsole();
    }
  }
  return <div className='login-form'>
    <div className='left'>
      <img src={require('@/assets/images/login-card-bg.png').default} alt="登录表单背景图"/>
    </div>
    <div className='right'>
      <h1 className='header'>
        <span className='bar'></span>
        <span className='text' onClick={onOpenDebug}>欢迎登录</span>
        <span className='bar bar-mirror'></span>
      </h1>
      <div className='body'>
        <Form
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="手机号"
            style={{marginBottom: 10}}
          >
            <Input
              className='base-input'
              bordered={false}
              placeholder='请输入手机号'
              value={data.phone}
              onChange={event => onFormChange({...data, phone: phoneNumberUtil(event.target.value)})}
            />
          </Form.Item>

          <div className='tip'>{tip || '未注册用户可以手机号直接登录'}</div>

          <Form.Item
            label="验证码"
          >
            <div className='captcha'>
              <Input
                bordered={false}
                placeholder='请输入验证码'
                className='captcha-input base-input'
                value={data.smsCode}
                onChange={event => onFormChange({...data, smsCode: event.target.value})}
              />
              <CaptchaButton
                className='captcha-input-btn'
                onChange={onGetCaptcha}
              />
            </div>
          </Form.Item>

          <Form.Item style={{marginBottom: '16px'}}>
            <div className='button-wrap'>
              <LoadingButton
                className='button'
                type="primary"
                htmlType="submit"
                onClick={() => onOk(data)}
              >登录</LoadingButton>
            </div>
          </Form.Item>

          <Form.Item>
            <div className='agreement-check' onClick={onCheck}>
              <Icon type={data.checked ? 'icon-pitch-on' : 'icon-pitch-on-off'}/>
              <span className='agreement'>我已阅读并同意<a target='_blank' href={linkConfig.userAgreement} className='blank-link' rel="noreferrer">《七牛云服务用户协议》</a>和<a className='blank-link' target='_blank' href={linkConfig.privacyRight} rel="noreferrer">《隐私权政策》</a></span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  </div>;
};

export default LoginForm;
