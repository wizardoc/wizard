import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
`;

export class FloatingPop extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Fab color="secondary" aria-label="Add">
          <AddIcon />
        </Fab>
      </Wrapper>
    );
  }
}
