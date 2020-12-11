import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

export interface MarkdownHeaderProps {
  cover: string;
}

const Wrapper = styled.div``;

const CoverWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeadCover = styled.img`
  max-width: 100%;
  max-height: 560px;
`;

export class MarkdownHeader extends Component<MarkdownHeaderProps> {
  render(): ReactNode {
    const {cover} = this.props;

    return (
      <Wrapper>
        <CoverWrapper>
          <HeadCover src={cover}></HeadCover>
        </CoverWrapper>
      </Wrapper>
    );
  }
}
