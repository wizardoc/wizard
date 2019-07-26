import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

import {Line} from './line';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: ${props => props.theme.primaryColor};
`;

// const LineContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1;
// `;

const CenterLine = styled(Line)``;

export const Center: FunctionComponent = props => (
  <Wrapper>
    <CenterLine></CenterLine>
    <Content>{props.children}</Content>
    <CenterLine></CenterLine>
  </Wrapper>
);
