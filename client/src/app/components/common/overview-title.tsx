import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: ${props => props.theme.titleColor};
  font-size: 30px;
`;

export class OverviewTitle extends Component {
  render(): ReactNode {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}
