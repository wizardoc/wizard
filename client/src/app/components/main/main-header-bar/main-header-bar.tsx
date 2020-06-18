import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

import {Logo} from '../../header-bar';

import {MainHeaderButtons} from './@main-header-buttons';

const Wrapper = styled.div`
  height: 72px;
  width: 100%;
  background: ${props => props.theme.primaryColor};
  padding: 15px 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

@withRouter
export class MainHeaderBar extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Logo />
        <MainHeaderButtons />
      </Wrapper>
    );
  }
}
