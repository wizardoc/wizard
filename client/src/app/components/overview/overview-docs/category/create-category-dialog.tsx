import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {
  DialogComponentProps,
  ActionDialog,
  ParsedActionButtons,
} from 'src/app/services';

const Wrapper = styled.div``;

export class CreateCategoryDialog extends Component<DialogComponentProps>
  implements ActionDialog {
  actionButtons(): ParsedActionButtons[] {
    return [{text: '确认'}];
  }

  render(): ReactNode {
    return <Wrapper>hello</Wrapper>;
  }

  componentDidMount(): any {
    console.info('child mount');
  }
}
