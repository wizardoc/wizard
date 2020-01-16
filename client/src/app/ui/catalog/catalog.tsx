import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {TreeView} from '../tree-view';
import {Line} from '../line';

export interface CatalogProps {
  content: string;
  title: string;
}

const Wrapper = styled.div`
  min-width: 220px;
  padding: 10px;
  background: ${props => props.theme.shallowGrayBlue};
  /* color: rgba(0, 0, 0, 0.87) !important; */
  box-shadow: ${props => props.theme.baseShadow};
  font-weight: 300;
`;

const Content = styled.div`
  position: sticky;
  top: 70px;
  margin-top: 30px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin: 30px 0;
  display: flex;
  justify-content: center;
`;

export class Catalog extends Component<CatalogProps> {
  render(): ReactNode {
    const {content, title} = this.props;

    return (
      <Wrapper>
        <Title>{title}</Title>
        <Line></Line>
        <Content>
          <TreeView content={content}></TreeView>
        </Content>
      </Wrapper>
    );
  }
}
