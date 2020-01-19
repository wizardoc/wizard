import {lazy} from 'src/app/utils';

import {Routes} from '../services';

const About = lazy(import('../pages/about'), 'About');

export const TeamRoutes: Routes = [
  {
    path: '/team',
    layout: 'limpidity',
    children: [
      {
        path: '/about',
        component: About,
      },
    ],
  },
];
