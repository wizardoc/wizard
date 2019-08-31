import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface TitleProps extends BlockProps {}

interface BlockProps {
  blockColor?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const Text = styled.p`
  font-size: 50px;
  font-weight: 100;
  margin: 0 0 0 30px;
`;

const Block = styled.div<BlockProps>`
  height: 50px;
  width: 5px;
  background: ${props => props.theme[props.blockColor || 'primaryColor']};
`;

export const Title: FunctionComponent<TitleProps> = props => (
  <Wrapper>
    <Block blockColor={props.blockColor}></Block>
    <Text>{props.children}</Text>
  </Wrapper>
);
