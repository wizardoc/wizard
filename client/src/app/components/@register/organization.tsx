import {
  SnackbarContent,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import {StyleRules, createStyles} from '@material-ui/core/styles';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const styles = (): StyleRules => createStyles({});

export interface OrganizationProps extends WithStyles<typeof styles> {}

export class TOrganization extends Component<OrganizationProps> {
  render(): ReactNode {
    // const {classes} = this.props;

    return (
      <Wrapper>
        <SnackbarContent
          message={
            <>
              <Typography variant="h6" component="h3">
                选择一个组织，开始你的规范日程
              </Typography>
              <Typography>组织是 wizard 的顶层建筑，文档由组织维护</Typography>
            </>
          }
        />
      </Wrapper>
    );
  }
}

export const Organization = withStyles(styles)(TOrganization);
