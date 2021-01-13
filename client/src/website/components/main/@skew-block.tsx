import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 450px;
  background: ${props => props.theme.mainPrimaryColor};
  transform-origin: left;
  transform: skewY(-18deg);
`;

export class SkewBlock extends Component {
  render(): ReactNode {
    return <Wrapper />;
  }
}
