import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

const Wrapper = styled.div``;

const BaseButton = styled(Button)`
  color: ${props => props.theme.white} !important;
  margin-right: 20px !important;
`;

const RegisterButton = styled(Button)`
  width: 102px;
  background: ${props => props.theme.white} !important;
  color: ${props => props.theme.primaryColor} !important;
`;

export class MainHeaderButtons extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <BaseButton href="/about">关于我们</BaseButton>
        <BaseButton href="/about">帮助</BaseButton>
        <BaseButton href="/about">登录</BaseButton>
        <RegisterButton href="/about">注册</RegisterButton>
      </Wrapper>
    );
  }
}
