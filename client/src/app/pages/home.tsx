import React, {Component, ReactNode} from 'react';
// tslint:disable-next-line:import-path-shallowest
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {MainContent, Started} from '../components';

const Wrapper = styled.div`
  width: 100%;
`;

class THome extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Started />
        <MainContent />
      </Wrapper>
    );
  }

  componentWillUpdate(): void {}
}

export const Home = RouterAnimation(THome);
