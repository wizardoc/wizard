import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import CheckIcon from '@material-ui/icons/Check';
import {OrganizationInfo} from '@wizardoc/shared';

import {User, OrganizationService} from 'website/services';
import {MemberBox} from 'website/components';

export interface OrganizationDetailCardProps {
  organizationInfo: OrganizationInfo;
}

const Wrapper = styled.div`
  width: 300px;
  padding: 15px;
  height: fit-content;
  border-radius: 5px;
`;

const OrganizeName = styled.div``;

const OrganizeDescription = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${props => props.theme.descriptionColor};
`;

const FieldName = styled.div`
  margin-top: 10px;
  font-size: 13px;
  font-weight: 500;
`;

const Contributors = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const FollowButton = styled(Button)``;

@observer
export class OrganizationDetailCard extends Component<OrganizationDetailCardProps> {
  @Inject
  user!: User;

  @Inject
  organizationService!: OrganizationService;

  @observable
  isFollowed = false;

  @observable
  isInOrganization = false;

  constructor(props: OrganizationDetailCardProps) {
    super(props);

    const {followOrganizations} = this.user.userInfo;
    const {id: organizationID, organizeName} = props.organizationInfo;

    this.isFollowed = !!followOrganizations.find(({id}) => id === organizationID);
    this.isInOrganization = this.organizationService.hasExistOrganization(organizeName);
  }

  async handleFollowOrganizationClick(id: string): Promise<void> {
    const result = await this.user.followOrganization(id);

    result.success(() => (this.isFollowed = true));
  }

  get followButtonText(): string {
    return this.isFollowed ? '已关注' : '关注组织';
  }

  get followButtonIcon(): ReactNode {
    return this.isFollowed ? <CheckIcon /> : <GroupAddIcon />;
  }

  render(): ReactNode {
    const {
      organizationInfo: {organizeName, description, members, id},
    } = this.props;

    const renderMembers = members.map(({avatar, username}) => (
      <MemberBox avatar={avatar} username={username} />
    ));

    return (
      <Wrapper>
        <OrganizeName>{organizeName}</OrganizeName>
        <OrganizeDescription>{description}</OrganizeDescription>
        <FieldName>成员：</FieldName>
        <Contributors>{renderMembers}</Contributors>
        {this.isInOrganization && (
          <FollowButton
            disabled={this.isFollowed}
            variant="contained"
            color="primary"
            startIcon={this.followButtonIcon}
            onClick={() => this.handleFollowOrganizationClick(id)}
          >
            {this.followButtonText}
          </FollowButton>
        )}
      </Wrapper>
    );
  }
}
