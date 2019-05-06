import React, {Component, ComponentClass, ReactNode} from 'react';
import {CSSTransition} from 'react-transition-group';

export interface RouterAnimationProps {
  match: unknown | null;
}

export function RouterAnimation(
  RouteViewComponent: ComponentClass,
): ComponentClass {
  return class extends Component<RouterAnimationProps> {
    render(): ReactNode {
      const {match} = this.props;

      console.info(match !== null);

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
