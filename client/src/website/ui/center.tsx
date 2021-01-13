import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

import {Line, LineProps} from './line';

interface CenterProps extends LineProps {}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: ${props => props.theme.primaryColor};
`;

const CenterLine = styled(Line)``;

export const Center: FunctionComponent<CenterProps> = props => (
  <Wrapper>
    <CenterLine {...props} />
    <Content>{props.children}</Content>
    <CenterLine {...props} />
  </Wrapper>
);
