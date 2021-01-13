import {RouteComponentProps} from 'react-router-dom';

import {Constructable} from 'website/types/type-utils';

import {Route, OriginGuard} from '../route';

export type DeactivatedGuardConstructor = Constructable<DeactivatedGuard>;

export type OriginDeactivatedGuardConstructor = OriginGuard<DeactivatedGuardConstructor>;

export interface DeactivatedGuard {
  canDeactivate(route: Route, props: RouteComponentProps<any>): boolean | string;
}
