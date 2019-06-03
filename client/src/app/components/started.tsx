import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {advantageConfigs} from '../constant';
import {User} from '../services';
import {AccessDialogStore} from '../store';
import {ActionButton} from '../ui';
import {InjectStore} from '../utils';

import {AdvantageCard} from './advantage-card';

const Wrapper = styled.div`
  width: 100%;
`;

const StartPanel = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  background: ${props => props.theme.shallowGray};
`;

const GetStarted = styled(ActionButton)<any>`
  width: 150px;
  background: ${props => props.theme.redLinearGradient};
`;

const GetStartedWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
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
          {advantageConfigs.map(config => (
            <AdvantageCard
              title={config.title}
              key={config.title}
              content={config.content}
            />
          ))}
        </StartPanel>
        <GetStartedWrapper>
          <GetStarted onClick={() => this.handleGetStartClick()}>
            立即开始!
          </GetStarted>
        </GetStartedWrapper>
        g
      </Wrapper>
    );
  }
}

export const Started = withRouter(TStarted);
