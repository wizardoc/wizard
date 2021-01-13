import {lazy} from 'website/utils';

import {Routes} from '../services';
import {OverviewAuthGuard, OrganizationGuard} from '../guards';

const OverviewCenter = lazy(import('../pages/overview'), 'OverviewPage');
const OverviewOrganization = lazy(import('../pages/overview'), 'OverviewOrganization');
const OverviewOrganizationEdit = lazy(
  import('../pages/overview'),
  'OrganizationEditPage',
);

const MessageCenter = lazy(import('../pages/message-center'), 'MessageCenter');
const OverviewDocs = lazy(import('../pages/overview'), 'OverviewDocs');

export const OverviewRoutes: Routes = [
  {
    path: '/overview',
    layout: 'limpidity',
    component: OverviewCenter,
    redirect: '/overview/organization',
    activatedGuard: [OverviewAuthGuard],
    children: [
      {
        path: '/organization',
        isNest: true,
        component: OverviewOrganization,
      },
      {
        path: '/organization/edit/:id',
        isNest: true,
        component: OverviewOrganizationEdit,
        activatedGuard: [OrganizationGuard],
      },
      {
        path: '/organization/docs/:id',
        isNest: true,
        component: OverviewDocs,
      },
      {
        path: '/messages',
        component: MessageCenter,
        isNest: true,
        layout: 'limpidity',
      },
    ],
  },
];
