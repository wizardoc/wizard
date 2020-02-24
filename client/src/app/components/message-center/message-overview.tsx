import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Inject} from 'react-ts-di';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Container,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {observable} from 'mobx';

import {NotifyService} from 'src/app/services';

const Wrapper = styled(Container)`
  padding: 50px 0;
`;

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
    const renderMessages = this.notifyService.messages.map(({main, id}) => (
      <ExpansionPanel
        expanded={this.currentExpanded === id}
        onChange={() => this.handleExpansionChange(id)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{main.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{main.body}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    return <Wrapper>{renderMessages}</Wrapper>;
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
