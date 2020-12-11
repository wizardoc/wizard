import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Document} from '@wizardoc/shared';
import {Typography} from '@material-ui/core';

export interface DocumentListItemProps {
  document: Document;
  onClick(): void;
}

interface CoverProps {
  src: string;
}

const Wrapper = styled.div`
  width: 490px;
  margin-bottom: 30px;
  overflow: hidden;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Footer = styled.div``;

const Title = styled(Typography)`
  font-size: 18px !important;
  line-height: 28px !important;
  color: ${props => props.theme.flatBlack};
  margin-bottom: 5px !important;
`;

const Excerpt = styled(Typography)`
  display: -webkit-box;
  color: ${props => props.theme.excerptGray};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.5 !important;
  font-size: 13px !important;
`;

const Text = styled.div``;

const Cover = styled.div<CoverProps>`
  width: 80px;
  height: 60px;
  background: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
  flex-shrink: 0;
  margin-left: 30px;
`;

export class DocumentListItem extends Component<DocumentListItemProps> {
  render(): ReactNode {
    const {onClick, document} = this.props;
    const {excerpt, title, cover} = document;

    return (
      <Wrapper onClick={onClick}>
        <InfoContainer>
          <Text>
            <Title>{title}</Title>
            <Excerpt>{excerpt}</Excerpt>
          </Text>
          <Cover src={cover} />
        </InfoContainer>
        <Footer></Footer>
      </Wrapper>
    );
  }
}
