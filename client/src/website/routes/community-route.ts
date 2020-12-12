import {Routes} from '../services';
import {Community} from '../pages/community';

export const CommunityRoute: Routes = [
  {
    path: '/community',
    layout: 'normal',
    component: Community,
    headerType: 'default',
  },
];
