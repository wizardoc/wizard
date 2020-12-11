import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';

import {Default} from './default';

export interface DefaultViewProps {
  defaultImg: string;
  children: any;
  text: string;
  condition(): boolean;
}

const DefaultPanel = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyCategoryImg = styled.img`
  width: 100px;
`;

const EmptyText = styled.div`
  color: ${props => props.theme.grayTextColor};
  margin-top: 10px;
`;

export class DefaultView extends Component<DefaultViewProps> {
  render(): ReactNode {
    const {defaultImg, condition, children, text} = this.props;

    return (
      <Default
        defaultView={
          <DefaultPanel>
            <EmptyCategoryImg src={defaultImg} />
            <EmptyText>{text}</EmptyText>
          </DefaultPanel>
        }
        condition={condition}
      >
        {children}
      </Default>
    );
  }
}
