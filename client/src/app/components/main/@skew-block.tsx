import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  background: ${props => props.theme.white};
  transform-origin: left;
  transform: skewY(-3deg);
`;

export class SkewBlock extends Component {
  render(): ReactNode {
    return <Wrapper></Wrapper>;
  }
}
