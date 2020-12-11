import React, {Component, ReactNode} from 'react';

export interface LazyLoadingProps {}

export class LazyLoading extends Component<LazyLoadingProps> {
  render(): ReactNode {
    return <div>loading</div>;
  }
}
