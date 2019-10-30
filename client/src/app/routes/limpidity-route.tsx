import React, {Component, ReactNode} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import {PenPage} from '../pages/pen';
import {RegisterPage} from '../pages/register-page';
import {LoginPage} from '../pages/login-page';

const Wrapper = styled.div`
  height: 100%;
  margin-top: -48px;
  padding-top: 48px;
  box-sizing: border-box;
`;

export class RouteLimpidityRoute extends Component<RouteComponentProps> {
  render(): ReactNode {
    return (
      <Wrapper>
        <Switch>
          <Route exact path="/limpidity/pen" component={PenPage} />
          <Route exact path="/limpidity/register" component={RegisterPage} />
          <Route exact path="/limpidity/login" component={LoginPage} />
        </Switch>
      </Wrapper>
    );
  }
}

export const LimpidityRoute = withRouter(RouteLimpidityRoute);
