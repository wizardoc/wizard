import {lazy} from 'react';

import {defaultify} from 'src/app/utils';

import {Routes} from '../routes';

const Pen = lazy(() => defaultify(import('../../../pages/pen'), 'Pen'));
const Register = lazy(() =>
  defaultify(import('../../../pages/register-page'), 'Register'),
);
const Login = lazy(() =>
  defaultify(import('../../../pages/login-page'), 'Login'),
);

export const limpidityRoutes: Routes = [
  {
    path: '/limpidity',
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
];
