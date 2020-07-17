import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Typography, IconButton} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpDown from '@material-ui/icons/ThumbDown';

export interface DocumentStatusBlockProps {}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled(Typography)`
  color: ${props => props.theme.flatGrayText};
  font-size: 13px;
`;

const Container = styled.div`
  width: 690px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const PraiseWrapper = styled.div``;

export class DocumentStatusBlock extends Component<DocumentStatusBlockProps> {
  render(): ReactNode {
    return (
      <Wrapper>
        <Container>
          <Text>您认为这篇文章对您有帮助吗？</Text>
          <PraiseWrapper>
            <IconButton>
              <ThumbUpIcon />
            </IconButton>
            <IconButton>
              <ThumbUpDown />
            </IconButton>
          </PraiseWrapper>
        </Container>
      </Wrapper>
    );
  }
}
