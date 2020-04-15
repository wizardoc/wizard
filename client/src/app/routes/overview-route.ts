import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const OverviewCenter = lazy(import('../pages/overview'), 'OverviewPage');
const OverviewOrganization = lazy(
  import('../pages/overview'),
  'OverviewOrganization',
);
const OverviewOrganizationEdit = lazy(
  import('../pages/overview'),
  'OrganizationEditPage',
);

export const OverviewRoutes: Routes = [
  {
    path: '/overview',
    layout: 'no-footer',
    component: OverviewCenter,
    children: [
      {
        path: '/organization',
        isNest: true,
        component: OverviewOrganization,
        children: [
          {
            path: '/edit',
            component: OverviewOrganizationEdit,
          },
        ],
      },
    ],
  },
];
