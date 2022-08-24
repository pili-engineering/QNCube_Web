import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { BaseApi } from '@/api';
import { useUserStore } from '@/store';

import './index.scss';

export const Auth: React.FC = (props) => {
  const { children } = props;
  const { dispatch } = useUserStore();
  const [authenticated, setAuthenticated] = useState(false);

  /**
   * 初始化用户信息
   */
  useEffect(() => {
    BaseApi.getAccountInfoApi().then(result => {
      dispatch({
        type: 'setUserInfo',
        payload: result.data
      });
      setAuthenticated(true);
    });
  }, [dispatch]);

  return <div className="auth">
    {
      authenticated ? children : <Spin className="auth-loading" tip="数据正在拼命加载中..."/>
    }
  </div>;
};
