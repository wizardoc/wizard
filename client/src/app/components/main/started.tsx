import {Card, CardActions, CardContent, Typography} from '@material-ui/core';
import Button, {ButtonProps} from '@material-ui/core/Button';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {User} from '../../services';
import {AccessDialogStore} from '../../store';
import {ActionButton} from '../../ui';
import {InjectStore} from '../../utils';

import {MainContent} from './@main-content';

const Wrapper = styled.div`
  width: 100%;
`;

const StartPanel = styled.div`
  height: 300px;
  display: flex;
  justify-content: space-around;
  background: ${props => props.theme.primaryColor};
`;

const GetStarted = styled(ActionButton)`
  width: 150px;
  color: ${props => props.theme.primaryColor} !important;
` as ComponentType<ButtonProps>;

const GetStartedWrapper = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
`;

interface StartedProps extends RouteComponentProps {}

class TStarted extends Component<StartedProps> {
  @InjectStore(AccessDialogStore)
  private accessDialogStore!: AccessDialogStore;

  @Inject
  private userService!: User;

  handleGetStartClick(): void {
    const {isLogin} = this.userService;
    const {history} = this.props;

    if (isLogin) {
      history.push('/doc');
    } else {
      this.accessDialogStore.accessDialogToggle();
    }
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StartPanel>
          <Typography>The awesome document management platform</Typography>
        </StartPanel>
        <GetStartedWrapper>
          <GetStarted
            variant="outlined"
            color="primary"
            onClick={() => this.handleGetStartClick()}
          >
            立即开始!
          </GetStarted>
        </GetStartedWrapper>
        <Card>
          <CardContent>
            <Typography>The awesome document management platform</Typography>
          </CardContent>
          <CardActions>
            <Button>About Us</Button>
          </CardActions>
        </Card>
        <MainContent />
      </Wrapper>
    );
  }
}

export const Started = withRouter(TStarted);
