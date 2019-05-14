import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
    position:relative;
    box-sizing: border-box;
    padding-bottom: 60px;
  }
`;
