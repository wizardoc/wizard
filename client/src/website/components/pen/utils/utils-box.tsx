import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {IconButton, Tooltip} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';

import {DraftService} from '../../../services';

import {TextUtils} from './@text-utils';
import {ListUtils} from './@list-utils';
import {MarkdownUtils} from './@markdown-utils';
import {FuncUtils} from './@func-utils';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export interface Util<P extends object = {}> {
  /** icon of util */
  icon: ComponentType<P>;
  /** style that need to be trigger */
  style?: string;
  /** tooltip content */
  tip: string;
  /** custom behavior */
  handler?(): void;
}

export class UtilsBox extends Component {
  @Inject
  draftService!: DraftService;

  handleUtilClick(style: string | undefined, handler = (): void => {}): void {
    if (style) {
      this.draftService.setCurrentStyle(style);
    }

    handler();
  }

  render(): ReactNode {
    return (
      <Wrapper>
        {/* text utils */}
        {[...TextUtils, ...ListUtils, ...MarkdownUtils, ...FuncUtils].map(
          ({tip, icon: Icon, style, handler}) => (
            <Tooltip title={tip} onClick={() => this.handleUtilClick(style, handler)}>
              <IconButton>
                <Icon />
              </IconButton>
            </Tooltip>
          ),
        )}
      </Wrapper>
    );
  }
}
