import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';

import {advantageConfigs} from '../../constant';

import {AdvantageCard} from './@advantage-card';

const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  margin: 100px 0 50px 0;
`;

export class AdvantageCards extends Component {
  render(): ReactNode {
    return (
      <Cards>
        {advantageConfigs.map(({title, content, img}) => (
          <AdvantageCard title={title} key={title} content={content} img={img} />
        ))}
      </Cards>
    );
  }
}
