import React, {Component, ComponentClass, ReactNode} from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import {CSSTransition} from 'react-transition-group';

export interface RouterAnimationProps {
  match: unknown | null;
}

export function RouterAnimation(RouteViewComponent: ComponentClass): any {
  return class extends Component<RouterAnimationProps> {
    render(): ReactNode {
      const {match} = this.props;

      return (
        <CSSTransition
          in={match !== null}
          classNames={{
            enter: 'animated',
            enterActive: 'fadeInDown',
            exit: 'animated',
            exitActive: 'fadeOutDown',
          }}
          timeout={1000}
          mountOnEnter
          unmountOnExit
        >
          <RouteViewComponent {...this.props} />
        </CSSTransition>
      );
    }
  };
}
