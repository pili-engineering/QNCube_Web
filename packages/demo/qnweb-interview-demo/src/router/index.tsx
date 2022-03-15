import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

const RouterConfig = [
  {
    path: '/login',
    component: lazy(() => import(/* webpackChunkName: 'login'*/ '../pages/login'))
  },
  {
    path: '/meeting-list',
    component: lazy(() => import(/* webpackChunkName: 'meeting-list'*/ '../pages/meeting-list'))
  },
  {
    path: '/meeting-entrance/:interviewId',
    component: lazy(() => import(/* webpackChunkName: 'meeting-entrance'*/ '../pages/meeting-entrance'))
  },
  {
    path: '/room/:interviewId',
    component: lazy(() => import(/* webpackChunkName: 'room'*/ '../pages/room'))
  },
  {
    path: '/device-test',
    component: lazy(() => import(/* webpackChunkName: 'device-test'*/ '../pages/device-test'))
  },
  {
    path: '/mobile/room/:interviewId',
    component: lazy(() => import(/* webpackChunkName: 'mobile-room'*/ '../pages/mobile/room'))
  }
];

interface RootRouterProps {
}

const Routes = () => {
  return <Switch>
    {
      RouterConfig.map(config => {
        return <Route key={config.path} {...config} />;
      })
    }
    <Redirect to='/login' path='*' />
  </Switch>;
};

const RootRouter: React.FC<RootRouterProps> = () => {

  return <Router>
    <Suspense fallback={
      <div className='page-render-loading'>
        <Spin spinning={true} tip='loading...' />
      </div>
    }>
      <Routes />
    </Suspense>
  </Router>;
};

export default RootRouter;