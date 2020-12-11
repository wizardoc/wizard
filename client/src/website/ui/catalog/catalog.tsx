import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';

import {Headings} from 'website/services';
import {CatalogService} from 'website/services/catalog-service';

export interface CatalogProps {
  headings: Headings;
  title: string;
}

interface CatalogItemProps {
  level: number;
  isActivated: boolean;
}

const Wrapper = styled.div`
  min-width: 220px;
  border-left: 4px solid ${props => props.theme.primaryColor};
  height: fit-content;
`;

const Content = styled.div``;

const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-left: 10px;
`;

const CatalogItem = styled.div<CatalogItemProps>`
  padding: 5px 0px;
  padding-left: ${props => (props.level - 1) * 10 + 10}px;
  color: ${props =>
    props.isActivated ? props.theme.primaryColor : props.theme.titleColor};
  font-size: 14px;
  border-radius: 0 3px 3px 0;

  ${props =>
    props.isActivated &&
    `
    font-weight: 500;
    background: ${props.theme.shallowGray};
  `}
`;

@observer
export class Catalog extends Component<CatalogProps> {
  @Inject
  catalogService!: CatalogService;

  render(): ReactNode {
    const {title} = this.props;

    return (
      <Wrapper {...this.props}>
        <Title>{title}</Title>
        <Content>{this.renderCatalogItems}</Content>
      </Wrapper>
    );
  }

  private get renderCatalogItems(): any {
    return this.props.headings.map(({level, content}) => (
      <CatalogItem
        isActivated={this.catalogService.currentAnchor?.content === content}
        key={content + level}
        level={+level}
      >
        {content}
      </CatalogItem>
    ));
  }
}
