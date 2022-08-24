import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import { Auth } from '@/layouts';
import { Login } from '@/pages/login';
import { Guide } from '@/pages/guide';
import { Room } from '@/pages/room';

export enum RoutePath {
  Base = '/',
  Login = '/login',
  Guide = '/guide',
  Room = '/room'
}

const MAIN_VERSION = mainVersion;

const IRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={RoutePath.Login}
        render={() => <Login nextUrl={RoutePath.Guide} version={MAIN_VERSION}/>}
      />
      <Route
        path={RoutePath.Base}
        render={() => {
          return <Auth>
            <Switch>
              <Route
                exact
                path={RoutePath.Guide}
                component={Guide}
              />
              <Route
                exact
                path={RoutePath.Room}
                component={Room}
              />
              <Redirect to={RoutePath.Login}/>
            </Switch>
          </Auth>;
        }}
      />
      <Redirect to="/login"/>
    </Switch>
  </BrowserRouter>
);

export default IRouter;
