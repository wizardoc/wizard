import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Container} from '@material-ui/core';

import {WizardTab, WizardTabConfig} from '../common';

const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.white};
  position: sticky;
  top: ${props => props.theme.headerBarHeight};
  box-shadow: ${props => props.theme.shallowShadow};
  z-index: 100;
`;

export class MessageSwitcher extends Component {
  tabs: WizardTabConfig[] = [
    {
      text: '系统消息',
      query: 'sssss',
    },
    {
      text: '用户消息',
      query: 'ss',
    },
    {
      text: '回收站',
      query: 'sssssssss',
    },
  ];

  render(): ReactNode {
    return (
      <Wrapper>
        <Container>
          <WizardTab tabs={this.tabs} />
        </Container>
      </Wrapper>
    );
  }
}
