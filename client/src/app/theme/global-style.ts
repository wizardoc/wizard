import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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
    background: #f8f8f8;
    padding: 15px;
    border-radius: 10px;
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
`;
