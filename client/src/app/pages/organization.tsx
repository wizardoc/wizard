import AddIcon from '@material-ui/icons/Add';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {
  NewOrganizationCard,
  OrganizationCard,
  PageContent,
  PageHeader,
  LayoutToggle,
} from '../components';
import {
  DialogService,
  OrganizationCardData,
  OrganizationService,
  Toast,
  Time,
} from '../services';
import {Carpet} from '../ui';
import OrganizationImg from '../assets/static/organization.png';
import {withTheme, ThemeComponentProps} from '../theme';

interface CardsWrapperProps {
  layout: string;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CardsWrapper = styled.div<CardsWrapperProps>`
  width: 100%;
  display: flex;

  ${props =>
    props.layout === 'column'
      ? `
      flex-wrap: wrap;
    `
      : `
      align-items: center;
      flex-wrap: nowrap;
      overflow-x: scroll;
    `}

  &::-webkit-scrollbar {
    /* width: 10px; */
    border: none !important;
    height: 6px !important;
  }

  &::-webkit-scrollbar-track {
    border: none !important;
    /* background: #f00 !important; */
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primaryColor};
    border-radius: 1000px;
  }
`;

const LayoutToggleWrapper = styled.div`
  margin: 15px 12.5px;
`;

@withTheme
@withRouter
@observer
export class Organization extends Component<
  Partial<ThemeComponentProps & RouteComponentProps>
> {
  @Inject
  organization!: OrganizationService;

  @Inject
  dialogService!: DialogService;

  @Inject
  toast!: Toast;

  @Inject
  time!: Time;

  @observable
  organizationCards: OrganizationCardData[] = [];

  @observable
  layout: string = 'column';

  async handleNewOrganizationClick(): Promise<void> {
    await this.dialogService.open(NewOrganizationCard, {
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
    const {theme} = this.props;

    const cards = this.organizationCards.map((data, index) => (
      <OrganizationCard
        seqIndex={index}
        organizationCardData={data}
        key={data.organizeName}
        // onOrganizationRemove={name => this.handleOrganizationRemove(name)}
      />
    ));

    return (
      <Wrapper>
        <Carpet color={theme!.baseGray}></Carpet>
        <PageHeader
          img={OrganizationImg}
          onFabClick={() => this.handleNewOrganizationClick()}
          title="组织"
          fabIcon={<AddIcon></AddIcon>}
        />
        <LayoutToggleWrapper>
          <LayoutToggle
            onChange={(value: string) => this.handleLayoutChange(value)}
          />
        </LayoutToggleWrapper>
        <PageContent>
          <CardsWrapper layout={this.layout}>{cards}</CardsWrapper>
        </PageContent>
      </Wrapper>
    );
  }

  async handleLayoutChange(value: string): Promise<void> {
    if (!value) {
      return;
    }

    const dup = this.organizationCards.slice();

    this.layout = value;
    this.organizationCards = [];

    await this.time.sleep(0);

    this.organizationCards = dup;
  }

  async fetchOrganizations(): Promise<void> {
    this.organizationCards = await this.organization.getAllJoinOrganization();
  }

  async componentDidMount(): Promise<void> {
    this.fetchOrganizations();
  }
}
