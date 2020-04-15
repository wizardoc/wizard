import React, {Component, ReactNode} from 'react';
import {observer} from 'mobx-react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import {OrganizationService} from 'src/app/services';
import {withTheme, ThemeComponentProps} from 'src/app/theme';
import DefaultImg from 'src/app/assets/static/rabbit.png';

import {OrganizationCard, NewOrganizationCard} from '../organization';
import {OverviewTitle, TransitionFab, FabCard, Default} from '../common';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.shallowGrayBlue};
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

@withTheme
@observer
export class OrganizationPanel extends Component<Partial<ThemeComponentProps>> {
  @Inject
  organizationService!: OrganizationService;

  render(): ReactNode {
    const {theme} = this.props;
    const organizationCards = this.organizationService.organizations.map(
      (info, index) => (
        <OrganizationCard organizationCardData={info} seqIndex={index} />
      ),
    );

    return (
      <Wrapper>
        <OverviewTitle>组织概览</OverviewTitle>
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

  async componentDidMount(): Promise<void> {
    await this.organizationService.getAllJoinOrganization();
  }
}
