import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import { RouterLoading } from '@/components';

export const routes = [
  {
    path: '/login',
    component: lazy(
      () => import(/* webpackChunkName: 'login' */ '../pages/login'),
    ),
  },
  {
    path: '/guide',
    component: lazy(() => import(/* webpackChunkName: 'role-select' */ '../pages/guide')),
  },
  {
    path: '/room',
    component: lazy(() => import(/* webpackChunkName: 'room' */ '../pages/room')),
  },
] as const;

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
