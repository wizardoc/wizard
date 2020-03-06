import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const MessageCenter = lazy(import('../pages/message-center'), 'MessageCenter');

export const CenterRoutes: Routes = [
  {
    path: '/center',
    layout: 'no-footer',
    children: [
      {
        path: '/messages',
        component: MessageCenter,
        layout: 'limpidity',
      },
    ],
  },
];
