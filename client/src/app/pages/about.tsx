import {Fade} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {
  Contributors,
  MDRender,
  PageHeader,
  // TreeViewGenerator,
} from '../components';
import {DialogService, DocService} from '../services';
import {TreeView} from '../ui';

const Wrapper = styled.div``;

const Side = styled.div`
  min-width: 290px;
  margin-right: 25px;
  padding: 10px;
  min-height: 500px;
  height: fit-content;
  background: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.87) !important;
  position: sticky;
  top: 70px;
`;

const SideTitle = styled.p`
  font-size: 30px;
  font-weight: 300;
`;

const Content = styled(MDRender)`
  width: calc(100% - 310px);
`;

const PageContent = styled.div`
  display: flex;
  padding: 25px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

@observer
class TAbout extends Component {
  @Inject
  dialogService!: DialogService;

  @Inject
  docService!: DocService;

  @observable
  content: string = '';

  @observable
  isMounted = false;

  render(): ReactNode {
    return (
      <Wrapper>
        <PageHeader title="关于"></PageHeader>
        <PageContent>
          <Side>
            <SideTitle>目录</SideTitle>
            <TreeView content={this.content}></TreeView>
          </Side>
          <Fade in={this.isMounted} timeout={500}>
            <ContentWrapper>
              <Content content={this.content}></Content>
              <Contributors></Contributors>
            </ContentWrapper>
          </Fade>
        </PageContent>
      </Wrapper>
    );
  }

  async componentDidMount(): Promise<void> {
    this.dialogService.loading(
      async (): Promise<void> => {
        this.content = await this.docService.getAboutWizard();
      },
    );
    this.isMounted = true;
  }
}

export const About = RouterAnimation(TAbout);
