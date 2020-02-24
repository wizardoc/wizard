import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const Register = lazy(import('../pages/register-page'), 'RegisterPage');
const Login = lazy(import('../pages/login-page'), 'LoginPage');
const EmailValidator = lazy(
  import('../pages/email-validator'),
  'EmailValidator',
);

export const UserRoutes: Routes = [
  {
    path: '/user',
    layout: 'no-footer',
    children: [
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/email-validator',
        component: EmailValidator,
      },
    ],
  },
];
