import {Container} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';

import {AboutUsCard} from './@about-us-card';
import {AdvantageCards} from './advantage-cards';

export class MainContent extends Component {
  render(): ReactNode {
    return (
      <Container fixed>
        <AboutUsCard />
        <AdvantageCards></AdvantageCards>
      </Container>
    );
  }
}
