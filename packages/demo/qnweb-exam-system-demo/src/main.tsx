import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import QNRTC, { QNLogLevel } from 'qnweb-rtc';
import './style/index.scss';
import { environment, defaultHttpRequestConfig } from '@/config';
import RootRouter from './router';
import registerRequestInterceptor from './register/registerRequestInterceptor';
import UserStore from '@/store/UserStore';

const requestConfig = defaultHttpRequestConfig[environment];

// 注册请求拦截器
registerRequestInterceptor(requestConfig);

moment.locale('zh-cn');

QNRTC.setLogLevel(QNLogLevel.NONE);

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <UserStore excludeRoutes={['/student/mobile-camera']}>
      <RootRouter />
    </UserStore>
  </ConfigProvider>,
  document.getElementById('root'),
);
