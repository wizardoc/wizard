import React, {Component, ReactNode, cloneElement, ReactElement} from 'react';
import styled from 'styled-components';
import {Card} from '@material-ui/core';

interface FabCardProps {
  title: string;
}

const Wrapper = styled(Card)`
  padding: 20px;
`;

const FabTitle = styled.div`
  font-size: 22px;
  margin: 10px 0;
`;

export class FabCard extends Component<FabCardProps> {
  render(): ReactNode {
    const {children, title} = this.props;
    const parsedChildren = cloneElement(children as ReactElement, {
      ...this.props,
    });

    return (
      <Wrapper>
        <FabTitle>{title}</FabTitle>
        {parsedChildren}
      </Wrapper>
    );
  }
}
