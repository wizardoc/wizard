import React, {ComponentType, Component, ReactNode} from 'react';

import {StyledTheme, styledTheme} from './style';

export interface WithThemeProps {
  theme: StyledTheme;
}

export function withTheme<P>(RenderComponent: ComponentType<P>): any {
  return class extends Component<any> {
    render(): ReactNode {
      return (
        <RenderComponent
          {...(this.props as any)}
          theme={styledTheme}
        ></RenderComponent>
      );
    }
  } as any;
}
