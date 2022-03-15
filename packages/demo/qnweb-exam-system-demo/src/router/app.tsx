import React, { useContext, useEffect } from 'react';
import eruda from 'eruda';
import { useLocation } from 'react-router-dom';
import { pandora } from '@/utils/pandora';
import { userStoreContext } from '@/store/UserStore';

const App: React.FC = (props) => {
  const { children } = props;
  const userStore = useContext(userStoreContext);
  const userId = userStore.state.userInfo?.accountId;
  const location = useLocation();
  // debug;
  useEffect(() => {
    const env = new URLSearchParams(window.location.search).get('env');
    if (env === 'debug') {
      eruda.init();
    }
  }, []);

  // 设置埋点userId
  useEffect(() => {
    if (userId) {
      pandora.setCache(userId, userId);
    }
  }, [userId]);

  // 设置埋点role和pathname
  useEffect(() => {
    if (location.pathname.includes('teacher')) {
      pandora.setCache('role', 'teacher');
    }
    if (location.pathname.includes('student')) {
      pandora.setCache('role', 'student');
    }
    pandora.setCache('pathname', location.pathname);
  }, [location]);

  // 页面刷新埋点
  useEffect(() => {
    const handlerRefresh = () => {
      pandora.report({
        action: 'refresh_page',
        value: window.location.href,
      });
    };
    window.addEventListener('beforeunload', handlerRefresh);
    return () => {
      window.removeEventListener('beforeunload', handlerRefresh);
    };
  }, []);
  return <>{children}</>;
};

export default App;
