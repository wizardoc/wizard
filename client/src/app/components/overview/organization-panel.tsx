import React, {Component, ReactNode} from 'react';
// import {observer} from 'mobx-react';
// import {Inject} from 'react-ts-di';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {withRouter, RouteComponentProps} from 'react-router-dom';

// import {OrganizationService} from 'src/app/services';
import {withTheme, ThemeComponentProps} from 'src/app/theme';
import DefaultImg from 'src/app/assets/static/rabbit.png';

import {OrganizationCard, NewOrganizationCard} from '../organization';
import {OverviewTitle, TransitionFab, FabCard, Default} from '../common';

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

@withRouter
@withTheme
// @observer
export class OrganizationPanel extends Component<
  Partial<ThemeComponentProps & RouteComponentProps>
> {
  // @Inject
  // organizationService!: OrganizationService;

  handleOrganizationCardClick(): void {
    this.props.history!.push('organization/docs');
  }

  render(): ReactNode {
    console.info('parent renderer');
    const data = [
      {
        ownerInfo: {
          avatar:
            'http://travel.gosolo.top/8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918屏幕快照 2020-03-31 下午9.58.16.png',
          loginTime: 1587459704115,
          username: 'admin2',
          email: 'zzhbbdbbd@1623.com',
          displayName: 'admin2',
          registerTime: 1582034685367,
        },
        id: 'bf626e55-2e77-476b-b959-8a6a896ab700',
        organizeName: 'world',
        description: '222',
        hasValid: true,
        createTime: 1589684062107,
        isPublic: true,
        categories: undefined,
        members: [
          {
            avatar:
              'http://travel.gosolo.top/8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918屏幕快照 2020-03-31 下午9.58.16.png',
            loginTime: 1587459704115,
            username: 'admin2',
            email: 'zzhbbdbbd@1623.com',
            displayName: 'admin2',
            registerTime: 1582034685367,
          },
        ],
        joinTime: 1589684062198,
        permissions: [5, 6, 1, 7, 4, 2, 0, 8, 3],
        isOwner: true,
      },
      {
        ownerInfo: {
          avatar:
            'http://travel.gosolo.top/8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a91822574136.jpeg',
          loginTime: 1587294761560,
          username: 'admin',
          email: 'zzhbbdbbd@163.com',
          displayName: 'admin',
          registerTime: 1582034221827,
        },
        id: '8663e9b7-d6aa-462c-8fed-d714437a37a6',
        organizeName: 'hello ',
        description: 'worldzxvvxccv',
        hasValid: true,
        createTime: 1587449422995,
        isPublic: true,
        categories: undefined,
        members: [
          {
            avatar:
              'http://travel.gosolo.top/8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a91822574136.jpeg',
            loginTime: 1587294761560,
            username: 'admin',
            email: 'zzhbbdbbd@163.com',
            displayName: 'admin',
            registerTime: 1582034221827,
          },
          {
            avatar:
              'http://travel.gosolo.top/8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918屏幕快照 2020-03-31 下午9.58.16.png',
            loginTime: 1587459704115,
            username: 'admin2',
            email: 'zzhbbdbbd@1623.com',
            displayName: 'admin2',
            registerTime: 1582034685367,
          },
        ],
        joinTime: 1587454607348,
        permissions: [6, 7, 2],
        isOwner: false,
      },
    ];
    const {theme} = this.props;
    const organizationCards = data.map((info, index) => (
      <OrganizationCard
        key={info.id}
        organizationCardData={info as any}
        seqIndex={index}
        onCardClick={() => this.handleOrganizationCardClick()}
      />
    ));

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
}
