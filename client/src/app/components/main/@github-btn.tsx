import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const StarContainer = styled.a`
  padding: 3px 10px 3px 8px;
  font-size: 16px;
  line-height: 22px;
  border-radius: 4px;
  background-color: #eee;
  background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
  background-repeat: no-repeat;
  border: 1px solid #d5d5d5;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
`;

const GithubIcon = styled.span`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  // todo github icon
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

const GithubText = styled.span`
  font-size: 16px;
  line-height: 22px;
`;

export class GithubBtn extends Component {
  render(): ReactNode {
    return (
      <Container>
        <StarContainer target="_blank" href="//github.com/wizaaard/wizard">
          <GithubIcon />
          <GithubText>Star</GithubText>
        </StarContainer>
      </Container>
    );
  }
}
