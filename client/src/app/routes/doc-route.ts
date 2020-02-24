import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const Pen = lazy(import('../pages/pen'), 'PenPage');
const Doc = lazy(import('../pages/doc'), 'Doc');

export const DocumentRoutes: Routes = [
  {
    path: '/document',
    layout: 'no-footer',
    component: Doc,
    children: [
      {
        path: '/markdown',
        component: Pen,
      },
    ],
  },
];
