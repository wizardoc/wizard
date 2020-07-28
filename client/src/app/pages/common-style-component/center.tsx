import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

import {Center} from '../../ui';

const TipHeader = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 30px;
  box-sizing: border-box;
`;

const CenterText = styled.span`
  color: white;
`;

export const CenterLine: FunctionComponent = props => (
  <TipHeader>
    <Center lineColor="#fff">
      <CenterText>{props.children}</CenterText>
    </Center>
  </TipHeader>
);
