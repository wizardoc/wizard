import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 660px;
  min-height: 192px;
  border: 1px dashed ${props => props.theme.white};
`;

export class CoverSelector extends Component {
  render(): ReactNode {
    return <Wrapper></Wrapper>;
  }
}
