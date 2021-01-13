import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';

export interface DocumentTitleProps {
  onTitleSelected(title: string): void;
}

const Wrapper = styled.div``;

export class DocumentTitle extends Component<DocumentTitleProps> {
  render(): ReactNode {
    const {onTitleSelected} = this.props;

    return (
      <Wrapper>
        <TextField label="标题" onChange={e => onTitleSelected(e.target.value)} />
      </Wrapper>
    );
  }
}
