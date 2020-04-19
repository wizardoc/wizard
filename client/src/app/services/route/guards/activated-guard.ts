import {RouteComponentProps} from 'react-router-dom';

import {Constructable} from 'src/app/types/type-utils';

import {Route, OriginGuard} from '../route';

export type ActivatedGuardConstructor = Constructable<ActivatedGuard>;

export type OriginActivatedGuardConstructor = OriginGuard<
  ActivatedGuardConstructor
>;

export type PropsInjector = (props: object) => void;

export interface ActivatedGuard {
  canActivated<T>(
    route: Route,
    props: RouteComponentProps<T>,
    inject: PropsInjector,
  ): boolean | Route['path'] | Promise<boolean | Route['path']>;
}
