import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';

import RegisterSuccess from '../../assets/static/register_successful.png';
import {DialogService, Toast} from '../../services';

const RegisterSuccessImg = styled.img`
  width: 300px;
`;

class RouterComplete extends Component<RouteComponentProps> {
  @Inject
  toast!: Toast;

  @Inject
  dialog!: DialogService;

  render(): ReactNode {
    return <RegisterSuccessImg src={RegisterSuccess} />;
  }

  componentDidMount(): void {
    // const {history} = this.props;

    this.toast.success('注册成功');
  }
}

export const Complete = withRouter(RouterComplete);
