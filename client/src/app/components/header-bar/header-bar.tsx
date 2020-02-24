import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import {AppBarProps} from '@material-ui/core/AppBar';
import {StyleRules} from '@material-ui/core/styles';
import {TypographyProps} from '@material-ui/core/Typography';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
// import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import Wizard from '../../assets/static/wizard-white.jpg';
import {DrawerService} from '../../services';
import {DocRecentUpdateDrawer} from '../doc-recent-update-drawer';

import {Funcs} from './@funcs';
import {HeaderBarTabs} from './header-bar-tabs';
import {HeaderSearch} from './@header-search';

interface AppBarWrapperProps {
  isFixed: boolean;
}

const styles = (theme: Theme): StyleRules =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    notification: {
      marginLeft: theme.spacing(1),
    },
  });

type HOCProps = WithStyles<typeof styles> & Partial<RouteComponentProps>;

export interface HeaderBarProps extends HOCProps {
  isFixed: boolean;
}

const Logo = styled.img`
  height: 22px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WizardTitle = styled(Typography)`
  cursor: pointer;
` as ComponentType<TypographyProps>;

const AppBarWrapper = styled(AppBar)<AppBarWrapperProps>`
  ${props => props.isFixed && 'top: 0;position: sticky !important;'}
` as ComponentType<AppBarProps & AppBarWrapperProps>;

@observer
@withRouter
class THeaderBar extends Component<HeaderBarProps> {
  @Inject
  private drawerService!: DrawerService;

  handleLogoClick(): void {
    this.drawerService.render(<DocRecentUpdateDrawer></DocRecentUpdateDrawer>, {
      anchor: 'left',
    });
  }

  handleWizardTitleClick(): void {
    const {history} = this.props;

    history!.push('/');
  }

  render(): ReactNode {
    const {
      classes: {grow},
      isFixed,
    } = this.props;

    console.info(isFixed);

    return (
      <AppBarWrapper position="static" isFixed={isFixed}>
        <Toolbar variant="dense">
          <Row>
            <IconButton onClick={() => this.handleLogoClick()}>
              <Logo src={Wizard} />
            </IconButton>
            <WizardTitle
              variant="h6"
              color="inherit"
              onClick={() => this.handleWizardTitleClick()}
            >
              Wizard
            </WizardTitle>
          </Row>
          <HeaderBarTabs />
          <div className={grow} />
          <HeaderSearch />
          <Funcs></Funcs>
        </Toolbar>
      </AppBarWrapper>
    );
  }
}

export const HeaderBar = withStyles(styles)(THeaderBar);
