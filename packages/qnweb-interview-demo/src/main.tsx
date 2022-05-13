import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';

import { UserStore, IMStore, RoomStore } from '@/store';
import { imConfig } from '@/config';
import App from './App';

import './styles/index.scss';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <UserStore>
      <IMStore value={{ appKey: imConfig.appKey }}>
        <RoomStore>
          <App/>
        </RoomStore>
      </IMStore>
    </UserStore>
  </ConfigProvider>,
  document.getElementById('root')
);
