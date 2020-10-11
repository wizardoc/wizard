import {lazy} from 'src/app/utils';

import {Routes} from '../services';
import {OrganizationGuard} from '../guards';
import {DocumentCenter} from '../pages/document-pages';

const Pen = lazy(import('../pages/write'), 'WritePage');
const Doc = lazy(import('../pages/doc'), 'Doc');
const Detail = lazy(import('../pages/document-detail'), 'DocumentDetail');

export const DocumentRoutes: Routes = [
  {
    path: '/document',
    layout: 'no-footer',
    component: Doc,
    children: [
      {
        path: '/center',
        component: DocumentCenter,
      },
      {
        path: '/:id/write',
        component: Pen,
        layout: 'limpidity',
        activatedGuard: [OrganizationGuard],
      },
      {
        path: '/detail/:id',
        component: Detail,
        layout: 'no-footer',
      },
    ],
  },
];
