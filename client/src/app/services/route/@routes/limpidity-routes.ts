import {lazy} from 'react';

import {defaultify} from 'src/app/utils';

import {Routes} from '../routes';

const Pen = lazy(() => defaultify(import('../../../pages/pen'), 'PenPage'));
const Register = lazy(() =>
  defaultify(import('../../../pages/register-page'), 'RegisterPage'),
);
const Login = lazy(() =>
  defaultify(import('../../../pages/login-page'), 'LoginPage'),
);

export const limpidityRoutes: Routes = [
  {
    path: '/lim',
    children: [
      {
        path: '/pen',
        component: Pen,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/login',
        component: Login,
      },
    ],
  },
  // {
  // path: '/limpidity',
  // component: Pen,
  // children: [
  //   {
  //     path: '/pen',
  //     component: Pen,
  //   },
  //   {
  //     path: '/register',
  //     component: Register,
  //   },
  //   {
  //     path: '/login',
  //     component: Login,
  //   },
  // ],
  // },
];
