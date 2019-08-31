import {createGlobalStyle} from 'styled-components';

import {styledTheme} from './style';

export const GlobalStyle = createGlobalStyle<{theme: typeof styledTheme}>`
  html, body {
    margin: 0;
    height:100%;
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
  }

  #root {
    height: 100%;
  }

  /* markdown */
  pre {
    background: ${props => props.theme.codeBgColor};
    padding: 15px;
    border-radius: 10px;
  }

  .md-codespan {
    background: ${props => props.theme.codeBgColor};
    color: ${props => props.theme.secondaryColor};
    padding: 3px 10px;
    border-radius: 5px;
  }

  .md-img-container {
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;

    & .md-img {
      border-radius: 5px;
      max-width: 600px;
      max-height: 500px;
    }
  }

  .md-heading {
    font-weight: 300;

    &:target {
      padding-top: 70px;
      margin-top: -70px;
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

    .md-quote-block {
      height: 100%;
      width: 5px;
      background: ${props => props.theme.primaryColor};
    }

    .md-quote-content {

    }
  }
`;
