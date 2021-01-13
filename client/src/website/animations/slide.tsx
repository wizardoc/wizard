import Slide, {SlideProps} from '@material-ui/core/Slide';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';

interface WithSlideOptions {
  direction: SlideProps['direction'];
  timeout: number;
}

export interface WithSlideProps {
  exitAnimation(cb: Function): void;
}

export function withSlide(options: WithSlideOptions): any {
  // tslint:disable-next-line:only-arrow-functions
  return function <P extends WithSlideProps>(
    Wrapper: ComponentType<P>,
  ): ComponentType<Exclude<P, keyof WithSlideProps>> {
    @observer
    class Body extends Component<Exclude<P, keyof WithSlideProps>> {
      @observable
      private isMounted = false;

      render(): ReactNode {
        return (
          <Slide {...options} in={this.isMounted} unmountOnExit>
            <div>
              <Wrapper
                {...this.props}
                exitAnimation={(cb: Function) => {
                  this.handleExistAnimation(cb);
                }}
              />
            </div>
          </Slide>
        );
      }

      handleExistAnimation(cb: Function): void {
        const {timeout} = options;

        this.isMounted = false;

        setTimeout(() => cb(), timeout);
      }

      componentDidMount(): void {
        this.isMounted = true;
      }
    }

    return Body;
  };
}
