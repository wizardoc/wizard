import {RouteComponentProps} from 'react-router-dom';

import {Constructable} from 'src/app/types/type-utils';

import {Route} from '../route';

export type DeactivatedGuardConstructor = Constructable<DeactivatedGuard>;

export interface DeactivatedGuard {
  canDeactivate(
    route: Route,
    props: RouteComponentProps<any>,
  ): boolean | string;
}
