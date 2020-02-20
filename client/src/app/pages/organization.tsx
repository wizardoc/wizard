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
  Toast,
} from '../services';
import {Carpet} from '../ui';
import OrganizationImg from '../assets/static/organization.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

@observer
export class Organization extends Component {
  @Inject
  organization!: OrganizationService;

  @Inject
  dialogService!: DialogService;

  @Inject
  toast!: Toast;

  @observable
  organizationCards: OrganizationCardData[] = [];

  async handleNewOrganizationClick(): Promise<void> {
    await this.dialogService.open(NewOrganizationDialog, {
      title: '创建自己的组织 :)',
      isClickAwayClose: true,
    });

    this.fetchOrganizations();
  }

  handleOrganizationRemove(name: string): void {
    const index = this.organizationCards.findIndex(
      ({organizeName}) => organizeName === name,
    );

    // tslint:disable-next-line:no-bitwise
    if (!~index) {
      return;
    }

    this.organizationCards.splice(index, 1);
    this.toast.success(`成功删除 ${name} !`);
  }

  render(): ReactNode {
    const cards = this.organizationCards.map((data, index) => (
      <OrganizationCard
        seqIndex={index}
        organizationCardData={data}
        key={data.organizeName}
        onOrganizationRemove={name => this.handleOrganizationRemove(name)}
      ></OrganizationCard>
    ));

    return (
      <Wrapper>
        <Carpet color="#eee"></Carpet>
        <PageHeader
          img={OrganizationImg}
          onFabClick={() => this.handleNewOrganizationClick()}
          title="组织"
          fabIcon={<AddIcon></AddIcon>}
        />
        <PageContent>
          <CardsWrapper>{cards}</CardsWrapper>
        </PageContent>
      </Wrapper>
    );
  }

  async fetchOrganizations(): Promise<void> {
    this.organizationCards = await this.organization.getAllJoinOrganization();
  }

  async componentDidMount(): Promise<void> {
    this.fetchOrganizations();
  }
}
