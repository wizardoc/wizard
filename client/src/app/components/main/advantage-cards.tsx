import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';

import {advantageConfigs} from '../../constant';

import {AdvantageCard} from './@advantage-card';

const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  margin: 0 0 50px;
`;

export class AdvantageCards extends Component {
  render(): ReactNode {
    return (
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
    );
  }
}
