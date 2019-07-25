import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    height:100%;
  }

  body {
    overflow-x: hidden;
  }

  #root {
    height: 100%;
  }
`;
