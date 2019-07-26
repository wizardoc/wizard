import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  margin-left: 30px;
  font-size: 50px;
  font-weight: 100;
  margin: 0;
`;

const Block = styled.div`
  height: 50px;
  width: 5px;
  background: ${props => props.theme.primaryColor};
`;

export const Title: FunctionComponent = props => (
  <Wrapper>
    <Block></Block>
    <Text>{props.children}</Text>
  </Wrapper>
);
