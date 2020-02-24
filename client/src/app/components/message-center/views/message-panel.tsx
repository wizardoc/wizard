import React, {Component, ReactNode} from 'react';

import {MessageOverview} from '../message-overview';

export class MessagePanel extends Component {
  render(): ReactNode {
    return <MessageOverview></MessageOverview>;
  }
}
