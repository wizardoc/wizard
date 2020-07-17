import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {OrganizationCardData} from 'src/app/services';
import {MemberBox} from 'src/app/components';

export interface OrganizationDetailCardProps {
  organizationInfo: OrganizationCardData;
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

export class OrganizationDetailCard extends Component<
  OrganizationDetailCardProps
> {
  render(): ReactNode {
    const {
      organizationInfo: {organizeName, description, members},
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
      </Wrapper>
    );
  }
}
