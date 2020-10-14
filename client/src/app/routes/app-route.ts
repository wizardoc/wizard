import {lazy} from 'src/app/utils';

import {Routes} from '../services';
import {Home} from '../pages/home';

const Organization = lazy(import('../pages/organization'), 'Organization');

export const RootRoutes: Routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    headerType: 'default',
    isFullContainer: false,
    layout: 'no-header',
  },
  {
    path: '/organizations',
    component: Organization,
  },
];
