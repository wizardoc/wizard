import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {findDOMNode} from 'react-dom';
import {Inject} from '@wizardoc/injector';

import {
  DialogComponentProps,
  ActionDialog,
  Toast,
  User,
  UploadService,
  ParsedActionButtons,
  DialogService,
  Time,
} from 'website/services';

import {ImagePreview} from '../../common';

import {ScalableBox, BaseSize} from './scalable-box';

interface AvatarSelectorProps {
  file: File;
}

const Wrapper = styled.div`
  position: relative;
`;

@observer
export class AvatarSelector
  extends Component<AvatarSelectorProps & Partial<DialogComponentProps>>
  implements ActionDialog {
  @observable
  dataUrl: string = '';

  @observable
  previewSize: BaseSize = {
    width: 0,
    height: 0,
  };

  @observable
  isLoading = true;

  @Inject
  dialogService!: DialogService;

  @Inject
  toast!: Toast;

  @Inject
  userService!: User;

  @Inject
  uploadService!: UploadService;

  @Inject
  time!: Time;

  previewRef = createRef<ImagePreview>();

  actionButtons(): ParsedActionButtons[] {
    return [
      {
        text: '取消',
        cb: () => this.props.close!(),
      },
      {
        text: '确认',
        cb: () => this.handleSelectBoxClose(this.props.file),
        props: {
          color: 'primary',
        },
      },
    ];
  }

  render(): ReactNode {
    const {file} = this.props;

    return (
      <Wrapper>
        <ScalableBox previewSize={this.previewSize} img={this.dataUrl} />
        <ImagePreview
          ref={this.previewRef}
          onReadEnd={(dataUrl: string) => (this.dataUrl = dataUrl)}
          file={file}
        />
      </Wrapper>
    );
  }

  componentDidMount(): void {
    const {current} = this.previewRef;

    if (!current) {
      return;
    }

    const previewDOM = findDOMNode(current) as HTMLDivElement;

    setTimeout(() => {
      const {
        clientWidth: width,
        clientHeight: height,
      } = previewDOM.parentElement as HTMLDivElement;

      this.previewSize = {
        width,
        height,
      };
    }, 1000);
  }

  async handleSelectBoxClose(file: File): Promise<void> {
    try {
      await this.dialogService.loading(async () => {
        const {url} = await this.uploadService.upload(file);

        await this.userService.updateAvatar(url);

        this.toast.success('上传成功！');
      });
    } catch (e) {
      this.toast.error('上传失败');
    }

    this.props.close!();
  }
}
