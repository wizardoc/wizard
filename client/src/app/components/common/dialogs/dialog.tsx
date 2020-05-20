import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {observer} from 'mobx-react';
import React, {Component, ReactNode, createRef} from 'react';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';

import {
  DialogPool,
  DialogService,
  ParsedActionButtons,
  ActionDialog,
  Time,
} from '../../../services';
import {Default} from '../default';

interface CommonDialogProps {
  dialogID?: string;
}

@observer
export class CommonDialog extends Component<CommonDialogProps> {
  @Inject
  private dialogPool!: DialogPool;

  @Inject
  private dialogService!: DialogService;

  @Inject
  private time!: Time;

  private contentRef = createRef<any>();

  @observable
  actionButtons: ParsedActionButtons[] = [];

  handleClose(isClose: boolean, dialogID: string): void {
    if (isClose) {
      this.dialogService.kill(dialogID);
    }
  }

  async componentDidMount(): Promise<void> {
    const isActionDialog = (target: any): target is ActionDialog =>
      !!target.actionButtons;

    // The content will mounted after dialog
    await this.time.sleep();

    const {current} = this.contentRef;

    if (current && isActionDialog(current)) {
      this.actionButtons = current.actionButtons();
    }
  }

  render(): ReactNode {
    const {dialogID} = this.props;

    if (!dialogID) {
      return <></>;
    }

    const {dialogs} = this.dialogPool;
    const config = dialogs.get(dialogID);
    const {isShow, content: Content} = config!;

    if (!config || !Content) {
      return <></>;
    }

    const {
      title,
      componentProps,
      isFullScreen,
      isClickAwayClose,
      hasTemplate = true,
    } = config.options;
    // const Content = withDialog(content, componentProps);
    const renderContent = (
      <Content ref={this.contentRef} {...componentProps}></Content>
    );

    return (
      <Default condition={() => !hasTemplate} defaultView={renderContent}>
        <Dialog
          fullScreen={!!isFullScreen}
          open={isShow}
          onClose={() => this.handleClose(!!isClickAwayClose, dialogID)}
        >
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogContent>{renderContent}</DialogContent>
          <Default condition={() => !this.actionButtons.length}>
            <DialogActions>
              {this.actionButtons.map(({text, cb, props = {}}) => (
                <Button {...props} key={text} onClick={cb}>
                  {text}
                </Button>
              ))}
            </DialogActions>
          </Default>
        </Dialog>
      </Default>
    );
  }
}
