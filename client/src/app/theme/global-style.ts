import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    height:100%;
  }

  body {
    overflow-x: hidden;
    background: #eceff1;
  }

  #root {
    height: 100%;
  }
`;
