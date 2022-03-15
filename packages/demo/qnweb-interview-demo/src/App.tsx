import React  from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import RootRouter from './router';
import { ConfigProvider } from 'antd';
import UserStore from '@/store';

function App() {
  return <ConfigProvider locale={zhCN}>
    <UserStore>
      <RootRouter />
    </UserStore>
  </ConfigProvider>;
}

export default App;
