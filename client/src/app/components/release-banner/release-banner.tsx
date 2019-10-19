import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${props => props.theme.translucentWhite};
  padding: 3px;
`;

export class ReleaseBanner extends Component {
  render(): ReactNode {
    return <Wrapper></Wrapper>;
  }
}
