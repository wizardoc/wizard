import React, {Component, ReactNode, ComponentType} from 'react';
import {IconButton, TypographyProps, Typography} from '@material-ui/core';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {DrawerService} from 'src/app/services';

import {DocRecentUpdateDrawer} from '../doc-recent-update-drawer';
import Wizard from '../../assets/static/wizard-white.jpg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 22px;
`;

const WizardTitle = styled(Typography)`
  cursor: pointer;
  color: ${props => props.theme.white} !important;
` as ComponentType<TypographyProps>;

@withRouter
export class Logo extends Component<Partial<RouteComponentProps>> {
  @Inject
  private drawerService!: DrawerService;

  handleLogoClick(): void {
    this.drawerService.render(<DocRecentUpdateDrawer />, {
      anchor: 'left',
    });
  }

  handleWizardTitleClick(): void {
    this.props.history!.push('/');
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <IconButton onClick={() => this.handleLogoClick()}>
          <LogoImg src={Wizard} />
        </IconButton>
        <WizardTitle
          variant="h6"
          color="inherit"
          onClick={() => this.handleWizardTitleClick()}
        >
          Wizardoc
        </WizardTitle>
      </Wrapper>
    );
  }
}
