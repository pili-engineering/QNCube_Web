import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import QNRTC, { QNLogLevel } from 'qnweb-rtc';
import { RecoilRoot } from 'recoil';

import { environment, defaultHttpRequestConfig } from '@/config';
import registerRequestInterceptor from './register/registerRequestInterceptor';
import UserStore from '@/store/UserStore';
import RootRouter from './router';

import './style/index.scss';

const requestConfig = defaultHttpRequestConfig[environment];

// 注册请求拦截器
registerRequestInterceptor(requestConfig);

moment.locale('zh-cn');

QNRTC.setLogLevel(QNLogLevel.NONE);

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <RecoilRoot>
      <UserStore excludeRoutes={['/student/mobile-camera']}>
        <RootRouter/>
      </UserStore>
    </RecoilRoot>
  </ConfigProvider>,
  document.getElementById('root'),
);
