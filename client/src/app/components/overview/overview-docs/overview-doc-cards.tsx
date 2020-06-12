import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Category} from '@wizardoc/shared';

import {CategoryCard} from './category';

export interface OverviewDocCardsProps {
  categories: Category[];
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
`;

const ViewCard = styled.div`
  margin: 15px;
`;

@observer
export class OverviewDocCards extends Component<OverviewDocCardsProps> {
  render(): ReactNode {
    const categoriesCards = this.props.categories.map(category => (
      <ViewCard key={category.id}>
        <CategoryCard info={category} />
      </ViewCard>
    ));

    return <Wrapper>{categoriesCards}</Wrapper>;
  }
}
