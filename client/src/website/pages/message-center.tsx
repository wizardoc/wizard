import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {MessageOverview} from '../components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.blueGrayBg};
  display: flex;
`;

export class MessageCenter extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <MessageOverview />
      </Wrapper>
    );
  }
}
