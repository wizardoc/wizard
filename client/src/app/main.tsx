import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {FloatingPop, Footer, SharePop} from './components';
import {AppRoutes} from './routes';

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 360px;
`;

export class Main extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <AppRoutes />
        <FloatingPop />
        <SharePop />
        <Footer />
      </Wrapper>
    );
  }
}
