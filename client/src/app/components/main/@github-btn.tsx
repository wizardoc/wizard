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

const CountContainer = styled.a`
  padding: 3px 10px 3px 8px;
  font-size: 16px;
  line-height: 22px;
  border-radius: 4px;
  display: block;
  margin-left: 6px;
  background-color: #fafafa;
  border: 1px solid #d4d4d4;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  &:before {
    left: -5px;
    margin-top: -6px;
    border-width: 6px 6px 6px 0;
    top: 50%;
    content: '';
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-right-color: #fafafa;
  }
  &:after {
    left: -6px;
    margin-top: -7px;
    border-width: 7px 7px 7px 0;
    top: 50%;
    z-index: -1;
    content: '';
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-right-color: #d4d4d4;
  }
`;

export class GithubBtn extends Component {
  render(): ReactNode {
    return (
      <Container>
        <StarContainer target="_blank" href="//github.com/wizaaard/wizard">
          <GithubIcon />
          <GithubText>Star</GithubText>
        </StarContainer>
        <CountContainer
          target="_blank"
          href="//github.com/wizaaard/wizard/stargazers/"
        >
          123
        </CountContainer>
      </Container>
    );
  }
}
