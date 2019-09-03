import EditIcon from '@material-ui/icons/Edit';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {PageHeader} from '../components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export class Organization extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <PageHeader title="组织" fabIcon={<EditIcon></EditIcon>}></PageHeader>
      </Wrapper>
    );
  }
}
