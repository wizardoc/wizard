import React, {Component, ReactNode} from 'react';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {observable} from 'mobx';

import {
  OrganizationService,
  User,
  OrganizationCardData,
} from 'website/services';
import {withTheme, ThemeComponentProps} from 'website/theme';
import DefaultImg from 'website/assets/static/rabbit.png';
import {Search, FilterItem, Filter} from 'website/ui';

import {OrganizationCard, NewOrganizationCard} from '../organization';
import {TransitionFab, FabCard, Default} from '../common';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.flatGray};
  padding: 20px 40px 20px 70px;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
`;

const Cards = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
`;

const DefaultImgContainer = styled.img`
  width: 90px;
`;

const AddOrganizationButton = styled(TransitionFab)`
  position: absolute !important;
  right: 30px;
  bottom: 50px;
`;

const DefaultView = styled(Cards)`
  height: calc(100% - 42px);
  justify-content: center;
  align-items: center;
  margin: 0;
  flex-direction: column;
`;

const DefaultText = styled.span`
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 70px;
`;

const StyledSearchBox = styled(Search)`
  width: 350px;
  height: 35px;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

enum FilterItemValues {
  ALL = 'all',
  OWN = 'own',
}

const filterItems: FilterItem[] = [
  {text: '全部', value: FilterItemValues.ALL},
  {text: '我的组织', value: FilterItemValues.OWN},
];

@withRouter
@withTheme
@observer
export class OrganizationPanel extends Component<
  Partial<ThemeComponentProps & RouteComponentProps>
> {
  @Inject
  organizationService!: OrganizationService;

  @Inject
  userService!: User;

  @observable
  organizations: OrganizationCardData[] = [];

  handleOrganizationCardClick(id: string): void {
    this.props.history!.push(`organization/docs/${id}`);
  }

  handleSearchClick(_text: string): void {}

  handleFilterChange(value: string): void {
    if (value === FilterItemValues.ALL) {
      this.organizations = this.organizationService.organizations;

      return;
    }

    this.organizations = this.organizationService.organizations.filter(
      ({ownerInfo}) =>
        ownerInfo.username === this.userService.userInfo?.username,
    );
  }

  async componentDidMount(): Promise<void> {
    await this.organizationService.isInit();

    this.organizations = this.organizationService.organizations;
  }

  render(): ReactNode {
    const {theme} = this.props;
    const organizationCards = this.organizations.map((info, index) => (
      <OrganizationCard
        key={info.id}
        organizationCardData={info}
        seqIndex={index}
        onCardClick={() => this.handleOrganizationCardClick(info.id)}
      />
    ));

    return (
      <Wrapper>
        <SearchWrapper>
          <Filter
            onChange={value => this.handleFilterChange(value)}
            items={filterItems}
          ></Filter>
          <StyledSearchBox
            onSearch={(text: string) => this.handleSearchClick(text)}
            placeholder="搜索组织"
          />
        </SearchWrapper>
        <Default
          condition={() => !organizationCards.length}
          defaultView={
            <DefaultView>
              <DefaultImgContainer src={DefaultImg} />
              <DefaultText>赶紧找到你的组织吧</DefaultText>
            </DefaultView>
          }
        >
          <Cards>{organizationCards}</Cards>
        </Default>
        <AddOrganizationButton
          icon={<AddIcon />}
          activeIcon={<CloseIcon />}
          activeFabColor={theme!.flatYellow}
        >
          {close => (
            <FabCard title="新组织">
              <NewOrganizationCard onCreateClick={close} />
            </FabCard>
          )}
        </AddOrganizationButton>
      </Wrapper>
    );
  }
}
