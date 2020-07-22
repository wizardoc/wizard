import {LazyExoticComponent} from 'react';

import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const LoadUserPage = (name: string): LazyExoticComponent<any> =>
  lazy(import('../pages/user-pages'), name);

const Register = LoadUserPage('RegisterPage');
const Login = LoadUserPage('LoginPage');
const EmailValidator = LoadUserPage('EmailValidator');
const Detail = LoadUserPage('UserDetailPage');

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
      {
        path: '/detail/:id',
        component: Detail,
        layout: 'normal',
      },
    ],
  },
];
