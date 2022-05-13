import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { useInterval } from 'ahooks';

import * as API from '@/api';
import { useUserStore, useIMStore } from '@/store';
import { LoginData, LoginForm } from './login-form';

import styles from './index.module.scss';

/**
 * 表单校验
 * @param value
 */
const validateForm = (value: LoginData): string | null => {
  if (!value.phone) {
    return '请输入手机号';
  }
  if (!value.smsCode) {
    return '请输入验证码';
  }
  if (!value.checked) {
    return '请阅读并同意七牛云服务用户协议和隐私权政策';
  }
  return null;
};

/**
 * 登录页面
 * @constructor
 */
const Login: React.FC = () => {
  const history = useHistory();
  const { dispatch: dispatchUserStoreState } = useUserStore();
  const { dispatch: dispatchIMStoreState } = useIMStore();

  // 登录数据
  const [loginData, setLoginData] = useState<LoginData>({
    phone: '',
    smsCode: '',
    checked: false
  });
  const [isSmsLoading, setIsSmsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [countdown, setCountdown] = useState<number>(); // 倒计时

  /**
   * 验证码倒计时
   */
  useInterval(() => {
    if (!countdown) return;
    if (countdown > 0) {
      setCountdown(countdown - 1);
    } else {
      setCountdown(undefined);
    }
  }, (countdown && countdown > 0) ? 1000 : undefined);

  /**
   * 点击登录按钮
   * @param data
   */
  const onSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true);
      const errMsg = validateForm(data);
      if (errMsg) {
        return message.error(errMsg);
      }
      const result = await API.signUpOrIn({
        phone: data.phone,
        smsCode: data.smsCode
      });
      setCountdown(60);
      dispatchUserStoreState({
        type: 'PATCH',
        payload: {
          loginToken: result.loginToken
        }
      });
      dispatchIMStoreState({
        type: 'PATCH',
        payload: {
          ...result.imConfig,
          imGroupId: `${result.imConfig?.imGroupId || ''}`,
        }
      });
      history.push('/meeting-list');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 点击获取验证码按钮
   */
  const onSmsClick = async () => {
    try {
      setIsSmsLoading(true);
      if (!loginData.phone) {
        message.error('请输入手机号');
        return;
      }
      await API.getSmsCode({ phone: loginData.phone });
      message.success('验证码发送成功');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSmsLoading(false);
    }
  };

  /**
   * 表单值修改
   * @param value
   */
  const onChange = (value: LoginData) => {
    setLoginData({
      ...value,
      phone: value.phone.replace(/\D/g, '').substring(0, 11)
    });
  };

  return <div className={styles.container}>
    <LoginForm
      className={styles.form}
      data={loginData}
      onChange={onChange}
      onSmsClick={onSmsClick}
      onSubmit={onSubmit}
      isSmsLoading={isSmsLoading}
      isLoading={isLoading}
      countdown={countdown}
    />
  </div>;
};

export default Login;
