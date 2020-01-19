import {RouteComponentProps} from 'react-router-dom';

import {Constructable} from 'src/app/types/type-utils';

import {Route} from '../route';

export type ActivatedGuardConstructor = Constructable<ActivatedGuard>;

export interface ActivatedGuard {
  canActivated(
    route: Route,
    props: RouteComponentProps<any>,
  ): boolean | Route['path'];
}
