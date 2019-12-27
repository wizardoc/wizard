import {lazy} from 'react';

import {defaultify} from 'src/app/utils';

import {Routes} from '../routes';

/** Lazy load */
const Home = lazy(() => defaultify(import('../../../pages/home'), 'Home'));
const Doc = lazy(() => defaultify(import('../../../pages/doc'), 'Doc'));
const Organization = lazy(() =>
  defaultify(import('../../../pages/organization'), 'Organization'),
);
const About = lazy(() => defaultify(import('../../../pages/about'), 'About'));
const EmailValidator = lazy(() =>
  defaultify(import('../../../pages/email-validator'), 'EmailValidator'),
);
const PublicSpace = lazy(() =>
  defaultify(import('../../../pages/public-space'), 'PublicSpace'),
);

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
