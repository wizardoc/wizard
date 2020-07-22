import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 35px;
  color: ${props => props.theme.titleGray};
`;

export class SettingTitle extends Component {
  render(): ReactNode {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}
