import React, { useContext, useState } from 'react';
import LoginForm, { LoginData } from '../../components/login-form';
import { getSmsCode, signUpOrIn } from '../../api';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import css from './index.module.scss';
import { UserStoreContext } from '@/store';

/**
 * 登录页面
 * @constructor
 */
const Login: React.FC = () => {
  const { dispatch } = useContext(UserStoreContext)
  const history = useHistory();
  const [loginData, setLoginData] = useState<LoginData>({
    phone: '',
    smsCode: '',
    checked: false
  });

  /**
   * 登录/注册点击
   * @param data
   */
  const onOk = async (data: LoginData) => {
    if (!loginData.phone) {
      message.error('请输入手机号')
      return Promise.reject('请输入手机号')
    }
    if (!loginData.smsCode) {
      message.error('请输入验证码');
      return Promise.reject('请输入验证码')
    }
    if (!loginData.checked) {
      message.error('请阅读并同意七牛云服务用户协议和隐私权政策');
      return Promise.reject('请输入验证码')
    }
    const userInfo = await signUpOrIn({
      phone: data.phone,
      smsCode: data.smsCode
    });
    dispatch({
      type: 'setAuthorization',
      payload: userInfo.loginToken,
    });
    dispatch({
      type: 'setIMConfig',
      payload: userInfo.imConfig,
    });
    history.push('/meeting-list');
  };

  /**
   * 点击获取验证码按钮
   */
  const onGetCaptcha = async () => {
    if (loginData.phone) {
      await getSmsCode({ phone: loginData.phone });
      message.success('验证码发送成功');
    } else {
      message.error('请输入手机号');
      return Promise.reject();
    }
  };

  return <div className={css.login}>
    <LoginForm
      className={css.form}
      data={loginData}
      onFormChange={value => setLoginData(value)}
      onGetCaptcha={onGetCaptcha}
      onOk={onOk}
      onCheck={() => setLoginData({
        ...loginData,
        checked: !loginData.checked
      })}
    />
  </div>;
};

export default Login;