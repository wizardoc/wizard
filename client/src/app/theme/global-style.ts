import {createGlobalStyle} from 'styled-components';

import {styledTheme} from './style';

export const GlobalStyle = createGlobalStyle<{theme: typeof styledTheme}>`
  html, body {
    margin: 0;
    height:100%;
    scroll-behavior: smooth;
  }

  body {
    background: ${props => props.theme.white};
  }

  #root {
    width: 100%;
    min-width: 100%;
    height: 100%;
    overflow: auto;
  }

  /* markdown */
  pre {
    background: ${props => props.theme.codeBgColor};
    color: ${props => props.theme.codeFontColor};
    padding: 15px;
    border-radius: 10px;
    white-space: pre-wrap;
  }

  .md-codespan {
    background: ${props => props.theme.shallowSecondaryColor};
    color: ${props => props.theme.secondaryColor};
    padding: 3px 10px;
    border-radius: 5px;
  }

  .md-code-fence {

  }

  .md-heading-wrapper {
    display: flex;
    align-items: center;

    &:target {
      padding-top: 70px;
      margin-top: -70px;
    }
  }

  .md-heading-block {
    height: 40px;
    width: 5px;
    background: ${props => props.theme.primaryColor};
    margin-right: 10px;
  }

  .md-heading {
    margin: 0;
    font-weight: 300;
  }

  .md-img-container {
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;

    & .md-img {
      border-radius: 5px;
      max-width: 100%;
    }
  }

  .md-text {
    color: ${props => props.theme.articleColor};
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
  }

  .md-quote-wrapper {
    display: flex;
    margin: 15px 0 15px 35px;

    .md-quote-block {
      width: 5px;
      background: ${props => props.theme.secondaryColor};
    }

    .md-quote-content {
      width: 100%;
      border-radius: 0 3px 3px 0;
      padding: 0 15px;
      background: ${props => props.theme.quoteBgColor};
    }
  }
`;
