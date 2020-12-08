import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import ChipInput, {
  ChipRendererArgs,
  Props as ChipInputProps,
} from 'material-ui-chip-input';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {Chip, CircularProgress} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import ErrorIcon from '@material-ui/icons/Error';

import {User, UserBaseInfo} from 'src/app/services';

import {Avatar} from '../avatar';

type FetchUserStatus = 'pending' | 'failure' | 'success';

export interface UserSearchLineProps {
  onChange(metadata: UserMetaData[]): void;
}

export interface UserMetaData {
  info?: UserBaseInfo;
  status: FetchUserStatus;
}

interface ChipProps {
  isError: boolean;
}

const StyledAvatar = styled(Avatar)`
  width: 20px !important;
  height: 20px !important;
  font-size: 15px !important;
`;

const StyledCircularProgress = styled(CircularProgress)`
  width: 20px !important;
  height: 20px !important;
`;

const StyledChip = styled(Chip)<ChipProps>`
  ${props =>
    props.isError &&
    `
      background: ${props.theme.errorRed} !important;
      color: ${props.theme.white} !important;
    `}

  margin-right: 8px;
  margin-bottom: 8px;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  color: ${props => props.theme.white} !important;
`;

@observer
export class UserSearchLine extends Component<
  UserSearchLineProps & ChipInputProps
> {
  @Inject
  userService!: User;

  @observable
  userNames: string[] = [];

  @observable
  userMetaData: UserMetaData[] = [];

  async handleAddUser(name: string): Promise<void> {
    this.userNames.push(name);
    this.userMetaData.push({
      status: 'pending',
    });
    this.props.onChange(this.userMetaData);

    const currentIdx = this.userMetaData.length - 1;
    const users = await this.userService.searchByName(name);

    this.userMetaData[currentIdx].info = users[0];
    this.userMetaData[currentIdx].status = !users.length
      ? 'failure'
      : 'success';
  }

  handleDeleteUser(idx: number): void {
    this.userNames.splice(idx, 1);
    this.userMetaData.splice(idx, 1);
    this.props.onChange(this.userMetaData);
  }

  chipRenderer({value, handleDelete}: ChipRendererArgs): ReactNode {
    const userMetadataIdx = this.userNames.findIndex(name => value === name);
    let distIcon = <StyledCircularProgress />;
    let isError = false;

    if (!!~userMetadataIdx) {
      const data = this.userMetaData[userMetadataIdx];
      const STATUS_DIST_ICON = {
        failure: <StyledErrorIcon />,
        success: (
          <StyledAvatar
            displayName={data.info?.displayName}
            lnk={data.info?.avatar}
          />
        ),
        pending: <StyledCircularProgress />,
      };

      distIcon = STATUS_DIST_ICON[data.status];
      isError = data.status === 'failure';
    }

    return (
      <StyledChip
        isError={isError}
        label={value}
        icon={distIcon}
        onDelete={() => handleDelete(userMetadataIdx)}
      />
    );
  }

  render(): ReactNode {
    const {onChange} = this.props;

    return (
      <ChipInput
        {...this.props}
        value={this.userNames}
        chipRenderer={(args: ChipRendererArgs) => this.chipRenderer(args)}
        onAdd={(name: string) => this.handleAddUser(name)}
        onDelete={(_, idx) => this.handleDeleteUser(idx)}
      />
    );
  }
}
