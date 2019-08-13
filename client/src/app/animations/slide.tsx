import {Grow} from '@material-ui/core';
import {SlideProps} from '@material-ui/core/Slide';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';

export function withSlide(
  Target: ComponentType<any>,
  direction: SlideProps['direction'],
): ComponentType<any> {
  @observer
  class TSlide extends Component<any> {
    @observable
    private isMounted = false;

    render(): ReactNode {
      console.info(direction);

      return (
        <Grow in={this.isMounted} timeout={1000}>
          <Target {...this.props}></Target>
        </Grow>
      );
    }

    componentDidMount(): void {
      this.isMounted = true;
      console.info(this.isMounted);
    }

    componentWillUnmount(): void {
      this.isMounted = false;
    }
  }

  return TSlide;
}
