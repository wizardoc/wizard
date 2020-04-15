import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const OverviewCenter = lazy(import('../pages/overview'), 'OverviewPage');
const OverviewOrganization = lazy(
  import('../pages/overview'),
  'OverviewOrganization',
);

export const OverviewRoutes: Routes = [
  {
    path: '/overview',
    layout: 'no-footer',
    component: OverviewCenter,
    children: [
      {
        path: '/organization',
        layout: 'no-footer',
        isNest: true,
        component: OverviewOrganization,
      },
    ],
  },
];
