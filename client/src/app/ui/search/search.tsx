import React, {Component, ReactNode} from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';
import {ArrowCache} from 'arrow-cache';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {SearchPrompt} from './@search-prompt';

const Wrapper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  padding: 10px;
`;

const StyledInputBase = styled(TextField)`
  margin-left: 10px;
  flex: 1;
`;

const StyledDivider = styled(Divider)`
  height: 28px;
  margin: 4px;
`;

export interface SearchProps {
  placeholder: string;
  width?: string;
  onSearch(content: string): void;
}

const SEARCH_CACHE_KEY = 'search_cache_key';
const searchCache = new ArrowCache({
  isPermanentMemory: true,
});

@observer
export class Search extends Component<SearchProps> {
  content: string = '';

  @observable
  options: string[] = [];

  constructor(props: SearchProps) {
    super(props);

    this.initOptions();
  }

  render(): ReactNode {
    const {placeholder, width = '100%'} = this.props;

    return (
      <SearchPrompt options={this.options} width={width}>
        {params => (
          <Wrapper component="form">
            <StyledIconButton aria-label="menu">
              <MenuIcon />
            </StyledIconButton>
            <StyledInputBase
              {...params}
              placeholder={placeholder}
              onChange={e => (this.content = e.target.value)}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
                disableUnderline: true,
              }}
            />
            <StyledIconButton
              aria-label="search"
              color="primary"
              onClick={() => this.handlerSearchClick(this.content)}
            >
              <SearchIcon />
            </StyledIconButton>
            <StyledDivider orientation="vertical" />
          </Wrapper>
        )}
      </SearchPrompt>
    );
  }

  handlerSearchClick(content: string): void {
    const {onSearch} = this.props;

    this.cacheSearchResult(content);

    onSearch(content);
  }

  private async initOptions(): Promise<void> {
    this.options = await searchCache.getItem(SEARCH_CACHE_KEY, []);
  }

  private async cacheSearchResult(content: string): Promise<void> {
    // cache search result
    this.options = await searchCache.append(
      SEARCH_CACHE_KEY,
      data => Array.from(new Set([...data, content])),
      [],
    );
  }
}
