import React, {Component, ReactNode} from 'react';
import {LoadingComponentProps} from 'react-loadable';

export interface LazyLoadingProps extends LoadingComponentProps {}

export class LazyLoading extends Component<LazyLoadingProps> {
  render(): ReactNode {
    return <div>loading</div>;
  }
}
