import React, {Component, ReactNode, ChangeEvent} from 'react';
import styled from 'styled-components';
import {Select, FormControlLabel, Checkbox} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';
import {NewDocumentData} from '@wizardoc/shared';

import {
  ActionDialog,
  ParsedActionButtons,
  DialogComponentProps,
  DocumentService,
  Toast,
} from 'src/app/services';

export interface CreateDocumentDialogProps {
  documentData: NewDocumentData;
}

const Wrapper = styled.div``;

@observer
export class CreateDocumentDialog
  extends Component<CreateDocumentDialogProps & DialogComponentProps>
  implements ActionDialog {
  @observable
  documentData: NewDocumentData;

  @Inject
  documentService!: DocumentService;

  @Inject
  toast!: Toast;

  constructor(props: CreateDocumentDialogProps & DialogComponentProps) {
    super(props);

    this.documentData = props.documentData;
  }

  actionButtons(): ParsedActionButtons[] {
    return [
      {
        text: '取消',
        cb: () => {
          this.props.close();
        },
      },
      {
        text: '发布',
        props: {color: 'primary'},
        cb: async () => {
          const result = await this.documentService.create(this.documentData);

          result.success(() => {
            this.toast.success('发布成功');
          });
        },
      },
    ];
  }

  handleIsPublicChange(e: ChangeEvent<HTMLInputElement>): void {
    this.documentData.isPublic = e.target.checked;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.documentData.isPublic}
              onChange={e => this.handleIsPublicChange(e)}
              name="checkedB"
              color="primary"
            />
          }
          label="是否公开"
        />
      </Wrapper>
    );
  }
}
