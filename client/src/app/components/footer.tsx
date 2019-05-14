import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background: ${props => props.theme.dark};
  position: absolute;
  bottom: 0;
  left: 0;
`;

export class Footer extends Component {
  render(): ReactNode {
    return <Wrapper />;
  }
}
