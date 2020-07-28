import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button, ButtonProps} from '@material-ui/core';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';

import {Time} from 'src/app/services';

export interface SendVerifyCodeButtonProps {
  maxCountdown?: number;
  children?: string;
  buttonProps?: ButtonProps;
  onClick?(): void;
}

const CountDown = styled.span`
  margin-left: 3px;
`;

const DEFAULT_MAX_COUNTDOWN = 60;

@observer
export class SendVerifyCodeButton extends Component<SendVerifyCodeButtonProps> {
  @observable
  _countdown = 0;

  @Inject
  time!: Time;

  async triggerTimer(): Promise<void> {
    if (this._countdown === 0) {
      return;
    } else {
      this._countdown--;
    }

    await this.time.sleep(1);
    this.triggerTimer();
  }

  set countdown(val: number) {
    this._countdown = val;
    this.triggerTimer();
  }

  async handleSendVerifyCodeClick(): Promise<void> {
    const {onClick = (): void => {}, maxCountdown} = this.props;

    this.countdown = maxCountdown ?? DEFAULT_MAX_COUNTDOWN;

    onClick();
  }

  render(): ReactNode {
    const {children, buttonProps} = this.props;

    return (
      <Button
        {...buttonProps}
        color={buttonProps?.color ?? 'primary'}
        onClick={() => this.handleSendVerifyCodeClick()}
        disabled={this._countdown !== 0 || buttonProps?.disabled}
      >
        {children}
        <CountDown>{!!this._countdown && this._countdown}</CountDown>
      </Button>
    );
  }
}
