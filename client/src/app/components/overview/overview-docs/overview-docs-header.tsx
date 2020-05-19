import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 10px 0;
`;

export class OverviewDocsHeader extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Button color="primary" variant="contained">
          创建分类
        </Button>
      </Wrapper>
    );
  }
}
