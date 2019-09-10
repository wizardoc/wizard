import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import RegisterSuccess from '../../assets/static/register_successful.png';
import {Toast} from '../../services';

const RegisterSuccessImg = styled.img`
  width: 300px;
`;

export class Complete extends Component {
  @Inject
  toast!: Toast;

  render(): ReactNode {
    return <RegisterSuccessImg src={RegisterSuccess} />;
  }

  componentDidMount(): void {
    this.toast.success('注册成功');
  }
}
