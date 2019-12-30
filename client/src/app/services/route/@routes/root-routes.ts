import {lazy} from 'src/app/utils';

import {Routes} from '../routes';

/** Lazy load */
const Home = lazy(import('../../../pages/home'), 'Home');

const Doc = lazy(import('../../../pages/doc'), 'Doc');
const Organization = lazy(
  import('../../../pages/organization'),
  'Organization',
);
const About = lazy(import('../../../pages/about'), 'About');
const EmailValidator = lazy(
  import('../../../pages/email-validator'),
  'EmailValidator',
);
const PublicSpace = lazy(import('../../../pages/public-space'), 'PublicSpace');

export const rootRoutes: Routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/doc',
    component: Doc,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/organization',
    component: Organization,
  },
  {
    path: '/email-validator',
    component: EmailValidator,
  },
  {
    path: '/public-space',
    component: PublicSpace,
  },
];
