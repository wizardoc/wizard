import {lazy} from 'website/utils';

import {Routes} from '../services';
import {OrganizationEmptyGuard} from '../guards';

const SelectOrganizationPage = lazy(
  import('../pages/organization-pages'),
  'SelectOrganizationPage',
);

const EmptyOrganizationPage = lazy(
  import('../pages/organization-pages'),
  'EmptyOrganizationPage',
);

const NewOrganizationPage = lazy(
  import('../pages/organization-pages'),
  'NewOrganizationPage',
);

export const OrganizationRoutes: Routes = [
  {
    path: '/organization',
    layout: 'no-header',

    children: [
      {
        path: '/select',
        component: SelectOrganizationPage,
        activatedGuard: [OrganizationEmptyGuard],
      },
      {
        path: '/empty',
        component: EmptyOrganizationPage,
      },
      {
        path: '/new',
        component: NewOrganizationPage,
      },
    ],
  },
];
