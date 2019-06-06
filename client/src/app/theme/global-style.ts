import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }

  body {
    position: relative;
    padding-bottom: 100px;
    overflow-x: hidden;
  }
`;
