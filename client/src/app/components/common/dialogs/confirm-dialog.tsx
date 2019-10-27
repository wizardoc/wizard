import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

interface ConfirmDialogProps {
  content: string;
}

const Wrapper = styled.div``;

export class ConfirmDialog extends Component<ConfirmDialogProps> {
  render(): ReactNode {
    return <Wrapper>{this.props.content}</Wrapper>;
  }
}
