import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Inject} from 'react-ts-di';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Container,
  ExpansionPanelSummaryProps,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {observable} from 'mobx';

import {NotifyService} from 'src/app/services';

import {MessageHeader} from '../message-header';

import {MessageItem} from './message-item';

const Wrapper = styled(Container)`
  padding: 0 100px !important;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const StyledExpansionPanel = styled(ExpansionPanel)`
  border-radius: 8px !important;
  border: none !important;
  margin: 5px 0 !important;
  box-shadow: none !important;

  ::before {
    content: none;
    height: 0 !important;
  }
`;

const UnreadContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  left: 8px;
  top: 0;
  position: absolute;
  z-index: 1;
`;

const Unread = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 10000px;
  background: ${props => props.theme.warnYellow};
  box-shadow: 0 0 5px ${props => props.theme.warnYellow};
`;

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  display: flex;
  flex-direction: column;
`;

const Cover = styled.div`
  background: ${props => props.theme.blueGrayBg};
  border-radius: 1000px;
  width: fit-content;
  padding: 3px 15px;
  word-break: break-all;
`;

const Title = styled(Cover)`
  margin-bottom: 20px;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.white};
`;

const Body = styled(Cover)`
  border-radius: 10px;
  padding: 8px 15px;
`;

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  position: relative;
` as ComponentType<ExpansionPanelSummaryProps>;

export interface MessageOverviewProps {
  type: 'user' | 'system';
}

@observer
export class MessageOverview extends Component {
  @Inject
  notifyService!: NotifyService;

  @observable
  currentExpanded: string = '';

  render(): ReactNode {
    const renderMessages = this.notifyService.messages.map(
      ({main, id, from, sendTime, isRead}) => (
        <StyledExpansionPanel
          expanded={this.currentExpanded === id}
          onChange={() => this.handleExpansionChange(id)}
          onClick={() => this.handleExpansionClick(id)}
        >
          <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <MessageItem from={from} sendTime={sendTime}></MessageItem>
            {!isRead && (
              <UnreadContainer>
                <Unread />
              </UnreadContainer>
            )}
          </StyledExpansionPanelSummary>
          <StyledExpansionPanelDetails>
            <Title>
              <Typography>标题：{main.title}</Typography>
            </Title>
            <Body>
              <Typography>{main.body}</Typography>
            </Body>
          </StyledExpansionPanelDetails>
        </StyledExpansionPanel>
      ),
    );

    return (
      <Wrapper>
        <MessageHeader></MessageHeader>
        {renderMessages}
      </Wrapper>
    );
  }

  handleExpansionClick(id: string): void {
    this.notifyService.readNotifyMessage(id);
  }

  handleExpansionChange(id: string): void {
    // close expansion when click self twice
    if (id === this.currentExpanded) {
      this.currentExpanded = '';

      return;
    }

    this.currentExpanded = id;
  }
}
