import {Fade} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {PageHeader, TreeViewGenerator} from '../components';
import {DialogService, DocService} from '../services';
import {marked} from '../utils';

const Wrapper = styled.div``;

const Side = styled.div`
  min-width: 290px;
  margin-right: 25px;
  padding: 10px;
  height: 500px;
  background: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.87) !important;
  position: sticky;
  top: 70px;
`;

const SideTitle = styled.p`
  font-size: 30px;
  font-weight: 300;
`;

const Content = styled.div`
  width: calc(100% - 310px);
`;

const PageContent = styled.div`
  display: flex;
  padding: 25px;
  box-sizing: border-box;
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
            <TreeViewGenerator
              rootText="关于"
              content={this.content}
            ></TreeViewGenerator>
          </Side>
          <Fade in={this.isMounted} timeout={500}>
            <Content
              dangerouslySetInnerHTML={{__html: marked(this.content)}}
            ></Content>
          </Fade>
        </PageContent>
      </Wrapper>
    );
  }

  async componentDidMount(): Promise<void> {
    this.dialogService.openLoading();
    this.content = await this.docService.getAboutWizard();
    this.dialogService.closeLoading();
    this.isMounted = true;
  }
}

export const About = RouterAnimation(TAbout);
