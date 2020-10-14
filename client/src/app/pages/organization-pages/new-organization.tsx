import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {TextField, Paper} from '@material-ui/core';

import {FormControl} from 'src/app/ui';
import {InviteMemberBox} from 'src/app/components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.flatGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Paper)`
  width: 962px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 25px;
`;

const Content = styled.div`
  width: fit-content;
`;

const StyledTextField = styled(TextField)`
  width: 544px;
`;

const StyledInviteMember = styled(InviteMemberBox)`
  width: 544px;
`;

export class NewOrganizationPage extends Component {
  handleFormDataChange(): void {}

  render(): ReactNode {
    return (
      <Wrapper>
        <Container>
          <Content>
            <FormControl onFormDataChange={() => this.handleFormDataChange()}>
              <StyledTextField
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                label="组织名称"
                helperText="组织名称用于外部展示，是组织唯一的标识"
              />
              <StyledTextField
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                label="描述"
                helperText="一句话描述你的组织，介绍你的组织"
              />
              <StyledInviteMember></StyledInviteMember>
            </FormControl>
          </Content>
        </Container>
      </Wrapper>
    );
  }
}
