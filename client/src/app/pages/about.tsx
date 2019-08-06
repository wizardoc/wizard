import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {PageHeader, TreeViewGenerator} from '../components';
import {DocService} from '../services';
import {marked} from '../utils';

const Wrapper = styled.div``;

const Side = styled.div`
  min-width: 290px;
  margin-right: 25px;
  padding: 10px;
  min-height: 500px;
  background: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.87) !important;
`;

const SideTitle = styled.p`
  font-size: 30px;
  font-weight: 300;
`;

const Content = styled.div``;
const PageContent = styled.div`
  width: 100%;
  display: flex;
  padding: 25px;
  box-sizing: border-box;
`;

@observer
class TAbout extends Component {
  @Inject
  docService!: DocService;

  @observable
  content: string = '';

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
          <Content
            dangerouslySetInnerHTML={{__html: marked(this.content)}}
          ></Content>
        </PageContent>
      </Wrapper>
    );
  }

  async componentDidMount(): Promise<void> {
    this.content = await this.docService.getAboutWizard();
  }
}

export const About = RouterAnimation(TAbout);
