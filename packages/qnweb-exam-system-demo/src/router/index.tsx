import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routes } from './config';
import App from './app';
import createRouter from './createRouter';
import RouterLoading from '../components/router-loading';

/**
 * reference: https://juejin.cn/post/6955886685510959135
 * @constructor
 */
const RootRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<RouterLoading />}>
      w<App>
        {createRouter(routes)}
      </App>
    </Suspense>
  </BrowserRouter>
);

export default RootRouter;
