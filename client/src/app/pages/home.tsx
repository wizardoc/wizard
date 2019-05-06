import React, {Component, ReactNode} from 'react';
// tslint:disable-next-line:import-path-shallowest
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {Started} from '../components';

const Wrapper = styled.div`
  width: 100%;
`;

export const Home = RouterAnimation(
  class extends Component {
    render(): ReactNode {
      return (
        <Wrapper>
          <Started />
        </Wrapper>
      );
    }
  },
);
