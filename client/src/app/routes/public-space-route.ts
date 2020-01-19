import {lazy} from 'src/app/utils';

import {Routes} from '../services';

/** Lazy load */
const PublicSpace = lazy(import('../pages/public-space'), 'PublicSpace');

export const PublicSpaceRoutes: Routes = [
  {
    path: '/public-space',
    component: PublicSpace,
  },
];
