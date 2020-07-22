import {LazyExoticComponent} from 'react';

import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const LoadUserPage = (name: string): LazyExoticComponent<any> =>
  lazy(import('../pages/user-pages'), name);

const Register = LoadUserPage('RegisterPage');
const Login = LoadUserPage('LoginPage');
const EmailValidator = LoadUserPage('EmailValidator');
const Detail = LoadUserPage('UserDetailPage');
const UserSettings = LoadUserPage('UserSettings');
const UserSettingsBase = LoadUserPage('UserSettingsBase');
const UserSettingsPhone = LoadUserPage('UserSettingsPhone');
const UserSettingsEmail = LoadUserPage('UserSettingsEmail');
const UserSettingsPassword = LoadUserPage('UserSettingsPassword');

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
      {
        path: '/settings',
        component: UserSettings,
        layout: 'normal',
        redirect: '/user/settings/base',
        children: [
          {
            path: '/base',
            component: UserSettingsBase,
            layout: 'limpidity',
            isNest: true,
          },
          {
            path: '/phone',
            component: UserSettingsPhone,
            layout: 'limpidity',
            isNest: true,
          },
          {
            path: '/email',
            component: UserSettingsEmail,
            layout: 'limpidity',
            isNest: true,
          },
          {
            path: '/password',
            component: UserSettingsPassword,
            layout: 'limpidity',
            isNest: true,
          },
        ],
      },
    ],
  },
];
