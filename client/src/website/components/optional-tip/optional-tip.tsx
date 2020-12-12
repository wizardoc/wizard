import {Button} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import {TodoItemData} from 'website/services/todo-service';

import {WithSlideProps, withSlide} from '../../animations';

export interface OptionalTipProps extends OptionalTipInfo {}

export interface OptionalTipInfo extends CalledOptionalTipInfo {
  onExecClick(): void;
  onLaterClick(): void;
}

export interface CalledOptionalTipInfo extends TodoItemData {
  icon?: ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 40px;
  z-index: 2000;
`;

const TipWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.white};
  border-radius: 5px;
  box-shadow: ${props => props.theme.baseShadow};
`;

const IconWrapper = styled.div`
  > * {
    font-size: 30px !important;
    padding: 20px;
    color: ${props => props.theme.primaryColor};
  }
`;

const InfoWrapper = styled.div``;

const ActionPlace = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  color: ${props => props.theme.grayTextColor};
  font-size: 13px;
`;

const Line = styled.div`
  width: 1px;
  height: 45px;
  margin: 0 10px;
  background: ${props => props.theme.deepGray};
`;

class TipBodyWrapper extends Component<
  OptionalTipProps & WithSlideProps & RouteComponentProps
> {
  hidden(isExec: boolean): void {
    const {
      exitAnimation,
      route,
      history,
      onExecClick,
      onLaterClick,
    } = this.props;

    exitAnimation(() => {
      if (isExec) {
        onExecClick();
        history.push(route);

        return;
      }

      onLaterClick();
    });
  }

  handleActionClick(): void {
    this.hidden(true);
  }

  handleLaterClick(): void {
    this.hidden(false);
  }

  render(): ReactNode {
    const {name, description, icon} = this.props;

    return (
      <TipWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <InfoWrapper>
          {name}
          <br />
          <Description>{description}</Description>
        </InfoWrapper>
        <Line></Line>
        <ActionPlace>
          <Button onClick={() => this.handleActionClick()}>马上去！</Button>
          <Button onClick={() => this.handleLaterClick()}>稍后</Button>
        </ActionPlace>
      </TipWrapper>
    );
  }
}

export class OptionalTip extends Component<OptionalTipProps> {
  render(): ReactNode {
    const SlideTipBodyWrapper = withSlide({direction: 'down', timeout: 500})(
      withRouter(TipBodyWrapper),
    );

    return (
      <Wrapper>
        <SlideTipBodyWrapper {...this.props}></SlideTipBodyWrapper>
      </Wrapper>
    );
  }
}
