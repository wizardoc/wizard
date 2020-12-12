import React, {Component, ReactNode, ChangeEvent} from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import {ArrowCache} from 'arrow-cache';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {SearchPrompt} from './@search-prompt';

const Wrapper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  border-radius: 10000px !important;
`;

const StyledIconButton = styled(IconButton)`
  padding: 10px;
`;

const StyledInputBase = styled.input`
  margin-left: 10px;
  flex: 1;
  border: none;
  outline: none;
`;

export interface SearchProps {
  placeholder: string;
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
    const {placeholder} = this.props;

    return (
      <SearchPrompt options={this.options}>
        {params => {
          console.info(params);

          return (
            <Wrapper {...this.props}>
              <StyledIconButton
                aria-label="search"
                color="primary"
                onClick={() => this.handlerSearchClick(this.content)}
              >
                <SearchIcon />
              </StyledIconButton>
              <StyledInputBase
                {...params}
                placeholder={placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  (this.content = e.target.value)
                }
                autoComplete="new-password"
              />
            </Wrapper>
          );
        }}
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
