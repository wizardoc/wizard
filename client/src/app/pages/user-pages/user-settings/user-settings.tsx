import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {UserSettingsSidebar} from 'src/app/components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: ${props => props.theme.flatGray};
`;

const CardContainer = styled.div`
  display: flex;
  height: fit-content;
  margin: 100px 0;
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.flatShadow};
  border-radius: 3px;
`;

const Viewer = styled.div`
  width: 690px;
  padding: 20px 40px;
  box-sizing: border-box;
`;

export class UserSettings extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <CardContainer>
          <UserSettingsSidebar></UserSettingsSidebar>
          <Viewer>{this.props.children}</Viewer>
        </CardContainer>
      </Wrapper>
    );
  }
}
