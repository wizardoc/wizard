import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';

import {DialogService} from 'src/app/services';

import {CreateCategoryDialog} from './category';

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 10px 0;
`;

export class OverviewDocsHeader extends Component {
  @Inject
  dialogService!: DialogService;

  handleCreateCategoryClick(): void {
    this.dialogService.open(CreateCategoryDialog, {
      isClickAwayClose: true,
      title: '创建组织',
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
