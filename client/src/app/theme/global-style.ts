import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    height:100%;
  }

  body {
    overflow-x: hidden;
  }

  pre {
    background: #f8f8f8;
    padding: 15px;
    border-radius: 10px;
  }

  #root {
    height: 100%;
  }
`;
