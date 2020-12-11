import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';

import {styledTheme} from 'website/theme';

const Wrapper = styled.span`
  background: ${styledTheme.shallowSecondaryColor};
  color: ${styledTheme.secondaryColor};
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

export class MDInlineCode extends Component {
  render(): ReactNode {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}
