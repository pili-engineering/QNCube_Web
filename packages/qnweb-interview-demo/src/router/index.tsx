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
    component: lazy(() => import(/* webpackChunkName: 'room'*/ '../pages/new-room'))
  },
  {
    path: '/device-test',
    component: lazy(() => import(/* webpackChunkName: 'device-test'*/ '../pages/device-test'))
  }
];

const RootRouter: React.FC = () => {
  return <Router>
    <Suspense fallback={
      <div className="page-render-loading">
        <Spin spinning={true} tip="loading..."/>
      </div>
    }>
      <Switch>
        {
          RouterConfig.map(config => {
            return <Route key={config.path} {...config} />;
          })
        }
        <Redirect to="/login" path="*"/>
      </Switch>
    </Suspense>
  </Router>;
};

export default RootRouter;
