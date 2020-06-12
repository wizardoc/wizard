import React, {Component, ReactNode, ComponentType} from 'react';
import {Injector, injector} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {Default} from '../default';

import {InlineLoading} from './inline-loading';

export type AsyncData = (
  injector: Injector,
  props: RouteComponentProps,
) => Promise<any>;

export interface FetchDataComponentProps<T = any> {
  data: T;
}

export function FetchData(
  asyncData: AsyncData,
): <T extends ComponentType<P>, P extends Partial<FetchDataComponentProps>>(
  Wrapper: T,
) => T {
  function factory<
    T extends ComponentType<P>,
    P extends Partial<FetchDataComponentProps>
  >(Wrapper: T): T {
    @withRouter
    @observer
    class FetchDataContainer extends Component<
      P & Partial<RouteComponentProps>
    > {
      @observable
      private data: unknown | undefined;

      render(): ReactNode {
        const ParsedWrapper = (Wrapper as unknown) as ComponentType<P>;
        const isLoading = this.data === undefined;

        return (
          <Default
            condition={() => isLoading}
            defaultView={<InlineLoading isLoading={isLoading} />}
          >
            <ParsedWrapper data={this.data} {...this.props}></ParsedWrapper>
          </Default>
        );
      }

      async componentDidMount(): Promise<void> {
        this.data = await asyncData(
          injector,
          this.props as RouteComponentProps,
        );
      }
    }

    return (FetchDataContainer as unknown) as T;
  }

  return factory;
}
