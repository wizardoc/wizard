import {Container} from '@material-ui/core';
import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {ContainerProps} from '@material-ui/core/Container';

import {AboutUsCard} from './@about-us-card';
import {AdvantageCards} from './advantage-cards';

const Wrapper = styled(Container)`
  /* position: relative; */
  /* top: 100px; */
  margin-top: 500px;
` as ComponentType<ContainerProps>;

export class MainContent extends Component {
  render(): ReactNode {
    return (
      <Wrapper fixed>
        <AboutUsCard />
        <AdvantageCards></AdvantageCards>
      </Wrapper>
    );
  }
}
