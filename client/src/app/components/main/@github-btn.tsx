import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import GithubPng from '../../assets/static/github.png';

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
  display: flex;
  align-items: center;
  &:hover,
  &:focus {
    text-decoration: none;
    background-color: #ddd;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, #eee),
      color-stop(100%, #ddd)
    );
    background-image: -webkit-linear-gradient(top, #eee 0, #ddd 100%);
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, #eee),
      to(#ddd)
    );
    background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd', GradientType=0);
    border-color: #ccc;
  }
`;

const GithubIcon = styled.span`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  background-image: url(${GithubPng});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  float: left;
`;

const GithubText = styled.span`
  font-size: 16px;
  font-weight: 700;
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
