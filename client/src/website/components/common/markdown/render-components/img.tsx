import React, {Component, ReactNode, ImgHTMLAttributes} from 'react';
import styled from 'styled-components';

export interface MDImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 5px;
  max-width: 100%;
`;

export class MDImage extends Component<MDImageProps> {
  render(): ReactNode {
    return (
      <Wrapper>
        <StyledImage {...this.props} />
      </Wrapper>
    );
  }
}
