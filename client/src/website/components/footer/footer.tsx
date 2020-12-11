import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {FooterDeclare} from './@footer-declare';
import {FooterPanel} from './@panel';

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

export class Footer extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <FooterPanel></FooterPanel>
        <FooterDeclare></FooterDeclare>
      </Wrapper>
    );
  }
}
