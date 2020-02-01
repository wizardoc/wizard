import React, {Component, ComponentType, ReactNode} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import {viewObservable, ViewObservableComponentProps} from '../utils';

interface WithFadeProps {
  direction: 'right' | 'left' | 'up' | 'down';
}

const AnimationClassNames = {
  right: 'fadeInRight',
  left: 'fadeInLeft',
  up: 'fadeInUp',
  down: 'fadeInDown',
};

const RATIO_VIEW_BOUND = 0;

export function withFade<P>(
  props: WithFadeProps,
): (Wrapper: ComponentType<P>) => any {
  return (Wrapper: ComponentType<P>): any => {
    @viewObservable()
    @observer
    class WithFadeWrapper extends Component<P & ViewObservableComponentProps> {
      @observable
      wrapperClassName = '';

      fadeInCompleteCB: OnFadeInCompleteCB = () => {};

      render(): ReactNode {
        return (
          <div className={this.wrapperClassName}>
            <Wrapper
              {...this.props}
              OnFadeInComplete={(cb: OnFadeInCompleteCB) =>
                this.handleFadeInComplete(cb)
              }
            />
          </div>
        );
      }

      handleFadeInComplete(cb: OnFadeInCompleteCB): void {
        this.fadeInCompleteCB = cb;
      }

      componentDidMount(): void {
        this.props.onObserve(entry => {
          const [firstEntry] = entry;

          if (firstEntry.intersectionRatio > RATIO_VIEW_BOUND) {
            this.wrapperClassName = `animated ${
              AnimationClassNames[props.direction]
            }`;

            this.fadeInCompleteCB();
          }
        });
      }
    }

    return WithFadeWrapper as any;
  };
}

export type OnFadeInCompleteCB = () => void;

export interface FadeInComponentProps {
  OnFadeInComplete(cb: OnFadeInCompleteCB): void;
}
