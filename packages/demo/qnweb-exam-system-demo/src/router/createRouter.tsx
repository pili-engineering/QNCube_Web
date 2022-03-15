import {
  Redirect, RedirectProps, Route, RouteProps, Switch,
} from 'react-router-dom';
import React, { ReactNode } from 'react';

export interface CommonRoute extends RouteProps {
  routes?: CustomRoute[];
  layout?: ReactNode;
}

export type RedirectRoute = Omit<RedirectProps, 'to'> & {
  redirect: string;
}

export type CustomRoute = CommonRoute | RedirectRoute;

/**
 * 重定向路由
 * @param route
 */
export const isRedirectRoute = (
  route: CustomRoute,
): route is RedirectRoute => Boolean('redirect' in route && route.redirect);

const createRedirectRoute = (route: RedirectRoute, key?: string): ReactNode => (
  <Redirect to={route.redirect} key={key || `redirect-${route.redirect}`} />
);

const createSubRoutes = (route: CommonRoute, key?: string): ReactNode => (
  <Route
    key={key || `route-${route.path}`}
    path={route.path}
    exact={route.exact}
  >
    {route.layout}
    {createRouter(route.routes || [])}
  </Route>
);

const createRoute = (route: CommonRoute, key?: string) => (
  <Route
    path={route.path}
    exact={route.exact}
    component={route.component}
    key={key || `route-${route.path}`}
  />
);

/**
 * 通用方法
 * 根据配置生成路由
 * @param routes
 */
const createRouter = (routes: CustomRoute[]) => (
  <Switch>
    {
      routes.map((route) => {
        if (isRedirectRoute(route)) {
          return createRedirectRoute(route);
        }
        if (route.routes?.length) {
          return createSubRoutes(route);
        }
        return createRoute(route);
      })
    }
  </Switch>
);

export default createRouter;
