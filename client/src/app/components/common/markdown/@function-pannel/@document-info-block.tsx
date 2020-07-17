import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

export interface DocumentInfoBlockProps {
  title: string;
}

const Wrapper = styled.div`
  box-shadow: ${props => props.theme.flatShadow};
  border-left: 4px solid ${props => props.theme.primaryColor};
  border-radius: 10px;
`;

const Title = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${props => props.theme.shallowGray};
  color: ${props => props.theme.titleColor};
  margin: 0 10px;
  font-weight: 500;
`;

export class DocumentInfoBlock extends Component<DocumentInfoBlockProps> {
  render(): ReactNode {
    const {title, children} = this.props;

    return (
      <Wrapper>
        <Title>{title}</Title>
        {children}
      </Wrapper>
    );
  }
}
