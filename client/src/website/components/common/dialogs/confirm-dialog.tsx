import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {ActionDialog, ParsedActionButtons, DialogComponentProps} from 'website/services';

type Handler = () => void;

interface ConfirmDialogProps {
  content: string;
  sureText: string;
  cancelText: string;
  onSureClick?(): void;
  onCancelClick?(): void;
}

const Wrapper = styled.div``;

export class ConfirmDialog
  extends Component<ConfirmDialogProps & DialogComponentProps>
  implements ActionDialog {
  actionButtons(): ParsedActionButtons[] {
    const {
      sureText,
      cancelText,
      onSureClick = (): void => {},
      onCancelClick = (): void => {},
      close,
    } = this.props;
    const withClose = (handler: Handler): Handler => () => {
      handler();
      close();
    };

    return [
      {
        text: sureText,
        cb: withClose(onSureClick),
        props: {color: 'primary'},
      },
      {
        text: cancelText,
        cb: withClose(onCancelClick),
      },
    ];
  }

  render(): ReactNode {
    return <Wrapper>{this.props.content}</Wrapper>;
  }
}
