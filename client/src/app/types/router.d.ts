import {RouteComponentProps} from 'react-router-dom';
import {ComponentType, ComponentClass} from 'react';

import {Omit} from './type-utils';

declare module 'react-router-dom' {
  // export function withRouter<
  //   P extends RouteComponentProps<any>,
  //   C extends React.ComponentType<P>
  // >(
  //   component: C & React.ComponentType<P>,
  // ): React.ComponentClass<
  //   Omit<P, keyof RouteComponentProps<any>> & WithRouterProps<C>
  // > &
  //   WithRouterStatics<C>;
  export function withRouter(component: any): any;
}
