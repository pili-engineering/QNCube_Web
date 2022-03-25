import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { RouterLoading } from '../components';

const routes = [
  {
    path: '/login',
    component: lazy(
      () => import(/* webpackChunkName: 'login' */ '../pages/login'),
    ),
  },
  {
    path: '/room-list',
    component: lazy(() => import(/* webpackChunkName: 'room-list' */ '../pages/room-list')),
  },
  {
    path: '/room/:roomId',
    component: lazy(() => import(/* webpackChunkName: 'room' */ '../pages/room')),
  },
];

const IRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<RouterLoading />}>
      <Switch>
        {
          routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))
        }
        <Redirect to="/login" />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default IRouter;
