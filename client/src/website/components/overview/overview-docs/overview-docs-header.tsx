import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {DialogService} from 'website/services';

import {CreateCategoryDialog} from './category';

interface RouteParams {
  id: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 10px 0;
`;

@withRouter
export class OverviewDocsHeader extends Component<
  Partial<RouteComponentProps<RouteParams>>
> {
  @Inject
  dialogService!: DialogService;

  handleCreateCategoryClick(): void {
    this.dialogService.open(CreateCategoryDialog, {
      isClickAwayClose: true,
      title: '创建分类',
      componentProps: {
        organizationID: this.props.match!.params.id,
      },
    });
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Button
          onClick={() => this.handleCreateCategoryClick()}
          color="primary"
          variant="contained"
        >
          创建分类
        </Button>
      </Wrapper>
    );
  }
}
