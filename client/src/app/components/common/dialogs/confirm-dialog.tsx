import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {ActionDialog, ParsedActionButtons} from 'src/app/services';

interface ConfirmDialogProps {
  content: string;
  sureText: string;
  cancelText: string;
  onSureClick?(): void;
  onCancelClick?(): void;
}

const Wrapper = styled.div``;

export class ConfirmDialog extends Component<ConfirmDialogProps>
  implements ActionDialog {
  actionButtons(): ParsedActionButtons[] {
    const {
      sureText,
      cancelText,
      onSureClick = (): void => {},
      onCancelClick = (): void => {},
    } = this.props;

    return [
      {
        text: sureText,
        cb: () => onSureClick(),
        props: {color: 'primary'},
      },
      {text: cancelText, cb: () => onCancelClick()},
    ];
  }

  render(): ReactNode {
    return <Wrapper>{this.props.content}</Wrapper>;
  }
}
