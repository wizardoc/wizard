import React, {ComponentType, Component, ReactNode} from 'react';

import {StyledTheme, styledTheme} from './style';

export interface WithThemeProps {
  theme: StyledTheme;
}

export function withTheme<T extends ComponentType<P>, P>(
  RenderComponent: T,
): T {
  return class extends Component<P> {
    render(): ReactNode {
      return (
        <RenderComponent
          {...(this.props as any)}
          theme={styledTheme}
        ></RenderComponent>
      );
    }
  } as T;
}
