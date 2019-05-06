import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {LoadingStore} from '../store';
import {ActionButton} from '../ui';
import {InjectStore} from '../utils';

const Wrapper = styled.div`
  width: 100%;
`;

const StartPanel = styled.div`
  height: 380px;
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

export class Started extends Component {
  @InjectStore(LoadingStore)
  private loadingStore!: LoadingStore;

  render(): ReactNode {
    return (
      <Wrapper>
        <StartPanel />
        <GetStartedWrapper>
          <GetStarted onClick={() => this.loadingStore.loadingDialogToggle()}>
            立即开始!
          </GetStarted>
        </GetStartedWrapper>
      </Wrapper>
    );
  }
}
