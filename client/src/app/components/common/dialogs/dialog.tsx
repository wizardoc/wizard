import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {observer} from 'mobx-react';
import React, {
  Component,
  ComponentType,
  FunctionComponent,
  ReactNode,
} from 'react';
import {Inject} from 'react-ts-di';

import {DialogPool, DialogService} from '../../../services';

interface CommonDialogProps {
  dialogID?: string;
}

function withDialog(
  Content: ComponentType,
  componentProps: any,
): ComponentType {
  return class extends Component {
    render(): ReactNode {
      return <Content {...componentProps}></Content>;
    }
  };
}

@observer
export class CommonDialog extends Component<CommonDialogProps> {
  @Inject
  private dialogPool!: DialogPool;

  @Inject
  private dialogService!: DialogService;

  handleClose(isClose: boolean, dialogID: string): void {
    if (isClose) {
      this.dialogService.kill(dialogID);
    }
  }

  render(): ReactNode {
    const {dialogID} = this.props;

    if (!dialogID) {
      return <></>;
    }

    const {dialogs} = this.dialogPool;
    const config = dialogs.get(dialogID);

    console.info(config);

    const {isShow, content} = config!;

    if (!config || !content) {
      return <></>;
    }

    const {
      title,
      actionButtons = [],
      componentProps,
      isFullScreen,
      isClickAwayClose,
    } = config.options;
    const Footer: FunctionComponent = () => {
      if (!actionButtons.length) {
        return <></>;
      }

      return (
        <DialogActions>
          {actionButtons.map(({text, cb, props = {}}) => (
            <Button {...props} key={text} onClick={cb}>
              {text}
            </Button>
          ))}
        </DialogActions>
      );
    };

    const Content = withDialog(content, componentProps);

    return (
      <Dialog
        fullScreen={!!isFullScreen}
        open={isShow}
        onClose={() => this.handleClose(!!isClickAwayClose, dialogID)}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <Content></Content>
        </DialogContent>
        <Footer></Footer>
      </Dialog>
    );
  }
}
