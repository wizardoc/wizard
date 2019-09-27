import AddIcon from '@material-ui/icons/Add';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {
  NewOrganizationDialog,
  OrganizationCard,
  PageContent,
  PageHeader,
} from '../components';
import {
  DialogService,
  OrganizationCardData,
  OrganizationService,
} from '../services';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

@observer
export class Organization extends Component {
  @Inject
  organization!: OrganizationService;

  @Inject
  dialogService!: DialogService;

  @observable
  organizationCards: OrganizationCardData[] = [];

  handleNewOrganizationClick(): void {
    this.dialogService.open(NewOrganizationDialog, {
      title: '创建自己的组织 :)',
      isClickAwayClose: true,
    });
  }

  render(): ReactNode {
    const cards = this.organizationCards.map(data => (
      <OrganizationCard
        organizationCardData={data}
        key={data.toString()}
      ></OrganizationCard>
    ));

    return (
      <Wrapper>
        <PageHeader
          onFabClick={() => this.handleNewOrganizationClick()}
          title="组织"
          fabIcon={<AddIcon></AddIcon>}
        ></PageHeader>
        <PageContent>{cards}</PageContent>
      </Wrapper>
    );
  }

  async componentDidMount(): Promise<void> {
    this.organizationCards = await this.organization.getAllJoinOrganization();
  }
}
