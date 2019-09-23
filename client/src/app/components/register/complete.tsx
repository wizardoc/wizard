import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import RegisterSuccess from '../../assets/static/register_successful.png';
import {Toast} from '../../services';

const RegisterSuccessImg = styled.img`
  width: 300px;
`;

class RouterComplete extends Component<RouteComponentProps> {
  @Inject
  toast!: Toast;

  render(): ReactNode {
    return <RegisterSuccessImg src={RegisterSuccess} />;
  }

  componentDidMount(): void {
    this.toast.success('注册成功');
  }
}

export const Complete = withRouter(RouterComplete);
