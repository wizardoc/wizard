import {Container} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {advantageConfigs} from '../../constant';

import {AdvantageCard} from './@advantage-card';

const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export class MainContent extends Component {
  render(): ReactNode {
    return (
      <Container fixed>
        <Cards>
          {advantageConfigs.map(config => (
            <AdvantageCard
              title={config.title}
              key={config.title}
              content={config.content}
            />
          ))}
        </Cards>
      </Container>
    );
  }
}
