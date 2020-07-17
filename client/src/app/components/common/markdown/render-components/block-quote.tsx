import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {styledTheme} from 'src/app/theme';

const Wrapper = styled.div`
  width: 100%;
  background: ${styledTheme.shallowPrimaryColor};
  padding: 10px 22px;
  border-radius: 3px;
  border-left: 4px solid ${styledTheme.primaryColor};
  box-sizing: border-box;
`;

export class MDBlockQuote extends Component {
  render(): ReactNode {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}
