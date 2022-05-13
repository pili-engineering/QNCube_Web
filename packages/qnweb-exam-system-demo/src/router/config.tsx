import { CustomRoute } from '@/router/createRouter';
import React, { lazy } from 'react';
import BaseHeader from '@/layouts/base-header';

export const routes: CustomRoute[] = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../pages/login')),
  },
  {
    path: '/guide',
    exact: true,
    component: lazy(() => import('../pages/guide')),
  },
  {
    path: '/mobile-camera',
    exact: true,
    component: lazy(() => import('../pages/student/mobile-camera')),
  },
  {
    path: '/student',
    layout: <BaseHeader titleRoutePath="/student" />,
    routes: [
      {
        path: '/student/list',
        exact: true,
        component: lazy(() => import('../pages/student/room-list')),
      },
      {
        path: '/student/room',
        exact: true,
        component: lazy(() => import('../pages/student/room')),
      },
      {
        path: '/student/detector',
        exact: true,
        component: lazy(() => import('../pages/student/detector')),
      },
      {
        redirect: '/student/list',
      },
    ],
  },
  {
    path: '/teacher',
    layout: <BaseHeader titleRoutePath="/teacher" />,
    routes: [
      {
        path: '/teacher/list',
        exact: true,
        component: lazy(() => import('../pages/teacher/room-list')),
      },
      {
        path: '/teacher/room',
        exact: true,
        component: lazy(() => import('../pages/teacher/room')),
      },
      {
        redirect: '/teacher/list',
      },
    ],
  },
  {
    redirect: '/login',
  },
];
