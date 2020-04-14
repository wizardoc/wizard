import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const OverviewCenter = lazy(import('../pages/overview-page'), 'OverviewPage');

export const OverviewRoutes: Routes = [
  {
    path: '/overview',
    layout: 'no-footer',
    component: OverviewCenter,
  },
];
