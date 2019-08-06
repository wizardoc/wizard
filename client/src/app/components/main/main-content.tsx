import {Container} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {advantageConfigs} from '../../constant';

import {AboutUsCard} from './@about-us-card';
import {AdvantageCard} from './@advantage-card';

const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  margin: 0 0 50px;
`;

export class MainContent extends Component {
  render(): ReactNode {
    return (
      <Container fixed>
        <AboutUsCard />
        <Cards>
          {advantageConfigs.map(config => (
            <AdvantageCard
              title={config.title}
              key={config.title}
              content={config.content}
              img={config.img}
            />
          ))}
        </Cards>
      </Container>
    );
  }
}
