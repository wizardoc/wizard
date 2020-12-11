import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {MessageTag as MessageTagValue} from 'website/services';

import {MessageTagMap} from './@message-tag-config';

export interface MessageTagProps {
  tag: MessageTagValue;
}

interface WrapperProps {
  color: string;
}

const Wrapper = styled.div<WrapperProps>`
  background: ${props => props.color};
  font-size: 12px;
  border-radius: 1000px;
  padding: 2px 10px;
  color: ${props => props.theme.white};
  margin-left: 10px;
`;

export class MessageTag extends Component<MessageTagProps> {
  render(): ReactNode {
    const {color, text} = MessageTagMap[this.props.tag];

    return <Wrapper color={color}>{text}</Wrapper>;
  }
}
