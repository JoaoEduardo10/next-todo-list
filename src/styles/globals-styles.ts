import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-transform: none;
  }
`;

export { GlobalStyles };
