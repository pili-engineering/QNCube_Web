import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Button, Form, Input, message,
} from 'antd';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useInterval } from 'ahooks';
import { pandora } from '@/utils';
import bgLoginImage from './images/bg-login.svg';
import loginCardBgImage from './images/login-card-bg.png';
import BarImage from './images/bar.svg';
import IconPitchOff from './images/icon-pitch-on-off.svg';
import IconPitchOn from './images/icon-pitch-on.svg';
import AgreementText from '../../components/agreement-text';
import styles from './index.module.scss';
import VersionCard from '../../components/version-card';
import { userStoreContext } from '@/store/UserStore';
import * as BaseCommonApi from '@/api/BaseCommonApi';

const PitchSvg: React.FC<{ checked: boolean }> = (props) => {
  const { checked } = props;
  return checked ?
    <img src={IconPitchOn} alt="IconPitchOn"/> :
    <img src={IconPitchOff} alt="IconPitchOff"/>;
};

interface FormValue {
  read: boolean;
  phoneNumber: string;
  smsCode: string;
}

function limitNumber(value: string, len: number): string {
  return value.replace(/\D/g, '').substring(0, len);
}

/**
 * 字段校验
 * @param value
 */
const validateForm = (value: FormValue): string | null => {
  if (!value.phoneNumber) return '请输入手机号';
  if (!value.smsCode) return '请输入验证码';
  if (!value.read) return '请阅读并同意七牛云服务用户协议和隐私权政策';
  return null;
};

const defaultCount = 60;
const version = projectVersion;

const Login = () => {
  const history = useHistory();
  const { dispatch } = useContext(userStoreContext);
  const [count, setCount] = useState(defaultCount);
  const [delay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [form, setForm] = useState<FormValue>({
    read: false,
    phoneNumber: '',
    smsCode: '',
  });
  const [loadingSmsCode, setLoadingSmsCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  /**
   * 倒计时
   */
  useInterval(
    () => {
      const nextCount = count - 1;
      setCount(nextCount > 0 ? nextCount : defaultCount);
    },
    isRunning ? delay : undefined,
  );

  /**
   * 重置
   */
  useEffect(() => {
    if (count === defaultCount) {
      setIsRunning(false);
    }
  }, [count]);

  /**
   * 挂载/卸载
   */
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  /**
   * 获取验证码
   */
  const onSmsCodeButton = () => {
    if (!isRunning) {
      setLoadingSmsCode(true);
      BaseCommonApi.getSmsCodeApi({
        phone: form.phoneNumber,
      })?.then(() => {
        setIsRunning(true);
        message.success('验证码发送成功');
      }).finally(() => {
        setLoadingSmsCode(false);
      });
    }
  };

  /**
   * 表单值更新
   * @param key
   * @param value
   */
  const onFieldChange = (key: keyof FormValue, value: unknown) => {
    const fieldMap: FormValue = {
      read: typeof value === 'boolean' && value,
      phoneNumber: typeof value === 'string' ? limitNumber(value, 11) : '',
      smsCode: typeof value === 'string' ? value : '',
    };
    setForm({
      ...form,
      [key]: fieldMap[key],
    });
  };

  /**
   * 点击登录
   */
  const onLogin = () => {
    // 埋点
    pandora.report({
      action: 'login',
    });
    const errorText = validateForm(form);
    if (errorText) {
      message.error(errorText);
    } else {
      setLoading(true);
      BaseCommonApi.signUpOrInApi({
        phone: form.phoneNumber,
        smsCode: form.smsCode,
      }).then((response) => {
        dispatch({
          type: 'setAuthorization',
          payload: response.loginToken,
        });
        dispatch({
          type: 'setIMConfig',
          payload: response.imConfig,
        });
        history.push('/guide');
      }).finally(() => {
        if (mounted.current) setLoading(false);
      });
    }
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bgLoginImage})` }}>
      <div className={styles.center}>
        <div className={styles.loginCard}>
          <div className={styles.loginIllustration}>
            <img src={loginCardBgImage} className={styles.loginIllustrationImage} alt="loginIllustrationImage"/>
          </div>
          <div className={styles.loginForm}>
            <div className={styles.loginFormHeader}>
              <img alt="loginFormHeaderBarImage" src={BarImage} className={styles.barImage}/>
              <span className={styles.loginFormHeaderText}>欢迎登录</span>
              <img alt="loginFormHeaderBarImage" src={BarImage} className={classNames(styles.barImage, styles.mirror)}/>
            </div>
            <Form
              layout="vertical"
              style={{ padding: '60px 0 30px' }}
            >
              <Form.Item label="手机号" style={{ marginBottom: 10 }}>
                <Input
                  bordered={false}
                  placeholder="请输入手机号"
                  className={styles.formInput}
                  value={form.phoneNumber}
                  onChange={(event) => onFieldChange('phoneNumber', event.target.value)}
                />
              </Form.Item>
              <div className={styles.tip}>未注册用户可以手机号直接登录</div>
              <Form.Item label="验证码" style={{ marginBottom: 10 }}>
                <Input
                  bordered={false}
                  placeholder="请输入验证码"
                  className={classNames(styles.formInput, styles.formSmsCodeInput)}
                  value={form.smsCode}
                  onChange={(event) => onFieldChange('smsCode', event.target.value)}
                />
                <Button
                  loading={loadingSmsCode}
                  onClick={onSmsCodeButton}
                  className={styles.smsCodeButton}
                  type="link"
                >
                  {
                    isRunning ? count : '获取验证码'
                  }
                </Button>
              </Form.Item>
            </Form>
            <Button
              onClick={onLogin}
              type="primary"
              block
              className={styles.loginButton}
              loading={loading}
            >
              登录
            </Button>
            <Form.Item>
              <div className={styles.agreement} onClick={() => onFieldChange('read', !form.read)}>
                <PitchSvg checked={form.read}/>
                <AgreementText/>
              </div>
            </Form.Item>
          </div>
        </div>
        <VersionCard
          list={[
            { name: '版本', version },
          ]}
        />
      </div>
    </div>
  );
};

export default Login;
