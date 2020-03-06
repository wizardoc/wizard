import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 250px;
  height: 100%;
  box-shadow: 0 0 100px ${props => props.theme.deepGray};
`;

const Header = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 300;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.white};
`;

export class MessageSide extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Header>消息中心</Header>
      </Wrapper>
    );
  }
}
