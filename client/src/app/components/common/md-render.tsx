import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

import {markdown} from '../../utils';

interface MDRenderProps {
  content: string;
}

const Wrapper = styled.div`
  transition: 0.3s all;

  &:target {
    transform: translateY(70px);
  }
`;

export const MDRender: FunctionComponent<MDRenderProps> = ({content}) => (
  <Wrapper dangerouslySetInnerHTML={{__html: markdown(content)}}></Wrapper>
);
