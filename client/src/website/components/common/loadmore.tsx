import React, {Component, ReactNode} from 'react';
import {CircularProgress} from '@material-ui/core';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import ToysIcon from '@material-ui/icons/Toys';

import {viewObservable, ViewObservableComponent} from 'website/utils';
import styled from 'website/theme/style';

export interface LoadMoreProps {
  loadText: string;
  endText: string;
  loadIcon?: Element;
  endIcon?: Element;
  // when the return value is false indicate that the all data has been loaded
  onFetch(): Promise<boolean>;
}

const LoadMoreInfoWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const LoadMoreText = styled.div`
  font-size: 14px;
  color: ${props => props.theme.coffeeGray};
  margin-left: 10px;
`;

const LoadingIcon = styled(CircularProgress)`
  width: 20px !important;
  height: 20px !important;
`;

const EndIcon = styled(ToysIcon)`
  color: ${props => props.theme.primaryColor};
`;

@viewObservable()
@observer
export class LoadMore extends Component<LoadMoreProps>
  implements ViewObservableComponent {
  @observable
  private hasData = true;

  async onObserve(): Promise<void> {
    if (!this.hasData) {
      return;
    }

    this.hasData = await this.props.onFetch();
  }

  get viewText(): string {
    const {loadText, endText} = this.props;

    return this.hasData ? loadText : endText;
  }

  get viewIcon(): Element {
    const {loadIcon = <LoadingIcon />, endIcon = <EndIcon />} = this.props;

    return (this.hasData ? loadIcon : endIcon) as Element;
  }

  render(): ReactNode {
    return (
      <LoadMoreInfoWrapper {...this.props}>
        {this.viewIcon}
        <LoadMoreText>{this.viewText}</LoadMoreText>
      </LoadMoreInfoWrapper>
    );
  }
}
