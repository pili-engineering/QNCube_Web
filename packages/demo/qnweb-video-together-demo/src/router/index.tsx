import React, { Fragment, lazy, Suspense } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
  RouteProps, RedirectProps,
} from 'react-router-dom';
import RouterLoading from '@/components/router-loading';

export type TCommonRoute = RouteProps & {
  routes?: TCustomRoute[]
};

export type TRedirectRoute = Omit<RedirectProps, 'to'> & {
  redirect: string;
}

export type TCustomRoute = TCommonRoute | TRedirectRoute;

const customRouteList: TCustomRoute[] = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../pages/login')),
  },
  {
    path: '/room',
    exact: true,
    component: lazy(() => import('../pages/room')),
  },
  {
    path: '/chatroom',
    exact: true,
    component: lazy(() => import('../pages/chatroom')),
  },
  {
    path: '/room-list',
    exact: true,
    component: lazy(() => import('../pages/room-list')),
  },
  {
    path: '/recent',
    exact: true,
    routes: [
      {
        path: '/recent/qrcode',
        exact: true,
        component: lazy(() => import('../pages/recent-qrcode')),
      },
      {
        path: '/recent/image',
        exact: true,
        component: lazy(() => import('../pages/rencent-image')),
      },
      {
        redirect: '/login',
      },
    ],
  },
  {
    redirect: '/login',
  },
];

/**
 * 重定向路由
 * @param route
 */
const isRedirectRoute = (route: TCustomRoute): route is TRedirectRoute => Boolean('redirect' in route && route.redirect);

/**
 * 普通路由
 * @param route
 */
const isCommonRoute = (route: TCustomRoute): route is TCommonRoute => !isRedirectRoute(route);

/**
 * reference: https://juejin.cn/post/6955886685510959135
 * @constructor
 */
const IRouter = () => {
  // 递归方法
  const routerListRecursion = (routerList: TCustomRoute[]) => routerList.map(
    (
      routeItem, key,
    ) => {
      if (isCommonRoute(routeItem)) {
        const {
          path, exact, routes, component: LazyComponent,
        } = routeItem;
        const newItem = { path, exact, routes };
        if (routes && routes.length) {
          return (
            <Fragment key={`fragment${key}`}>
              {
                LazyComponent ? (
                  <Route
                    key={key}
                    {...newItem}
                    render={(props) => <LazyComponent {...props} />}
                  />
                ) : null
              }
              <Switch key={`switch${key}`}>
                {routerListRecursion(routes)}
              </Switch>
            </Fragment>
          );
        }
        return (
          LazyComponent ? (
            <Route
              key={key}
              {...newItem}
              render={(props) => <LazyComponent {...props} />}
            />
          ) : null
        );
      }
      const { redirect, ...restProps } = routeItem;
      return <Redirect key={key} to={redirect} {...restProps} />;
    },
  );
  return (
    <BrowserRouter>
      <Suspense fallback={<RouterLoading />}>
        <Switch>
          {
            routerListRecursion(customRouteList)
          }
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default IRouter;
