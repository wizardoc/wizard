import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Category} from '@wizardoc/shared';
import {Fab} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import {
  OverviewDocsHeader,
  OverviewDocCards,
  FetchData,
  FetchDataComponentProps,
  DefaultView,
} from 'website/components';
import {withTheme, ThemeComponentProps} from 'website/theme';
import {CategoryService} from 'website/services';

import EmptyCategory from '../../assets/static/man.svg';

interface RouteParams {
  id: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background: rgb(245, 245, 245);
  padding: 20px 40px 20px 70px;
  overflow: scroll;
`;

const WriteDocumentButton = styled(Fab)`
  position: fixed !important;
  right: 50px;
  bottom: 50px;
`;

@FetchData(
  async ({extract}, props: RouteComponentProps<RouteParams>): Promise<Category[]> => {
    return extract(CategoryService).getAllCategories(props.match.params.id);
  },
)
@withRouter
@withTheme
export class OverviewDocs extends Component<
  Partial<
    ThemeComponentProps &
      RouteComponentProps<RouteParams> &
      FetchDataComponentProps<Category[]>
  >
> {
  @Inject
  categoryService!: CategoryService;

  handleWriteDocumentClick(): void {
    const {match, history} = this.props;

    history!.push(`/document/${match!.params.id}/write`);
  }

  render(): ReactNode {
    const {match, data} = this.props;

    return (
      <Wrapper>
        <OverviewDocsHeader />
        <DefaultView
          defaultImg={EmptyCategory}
          text="快来创建你的第一个分类吧！"
          condition={() => this.categoryService.isEmpty(match!.params.id)}
        >
          <OverviewDocCards categories={data!} />
        </DefaultView>
        <WriteDocumentButton
          onClick={() => this.handleWriteDocumentClick()}
          color="primary"
        >
          <EditIcon />
        </WriteDocumentButton>
      </Wrapper>
    );
  }
}
