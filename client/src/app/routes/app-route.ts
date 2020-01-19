import {lazy} from 'src/app/utils';

import {Routes} from '../services';

/** Lazy load */
const Home = lazy(import('../pages/home'), 'Home');

const Organization = lazy(import('../pages/organization'), 'Organization');

export const RootRoutes: Routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/organization',
    component: Organization,
  },
];
