import {Button} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
`;

const StartPanel = styled.div`
  height: 380px;
  background: ${props => props.theme.shallowGray};
`;

const GetStarted = styled(Button)<any>`
  background: ${props => props.theme.redLinearGradient};
`;

export class Started extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <StartPanel />
        <GetStarted>立即开始!</GetStarted>
      </Wrapper>
    );
  }
}
