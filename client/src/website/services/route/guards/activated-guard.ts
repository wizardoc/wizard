import {RouteComponentProps} from 'react-router-dom';

import {Constructable} from 'website/types/type-utils';

import {Route, OriginGuard} from '../route';

export type ActivatedGuardConstructor = Constructable<ActivatedGuard>;

export type OriginActivatedGuardConstructor = OriginGuard<ActivatedGuardConstructor>;

export type PropsInjector = (props: object) => void;

export interface ActivatedGuard {
  canActivated(
    route: Route,
    props: RouteComponentProps<any>,
    inject: PropsInjector,
  ): boolean | Route['path'] | Promise<boolean | Route['path']>;
}
