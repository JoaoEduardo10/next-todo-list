import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: ${({ theme }) => theme.font.family.primary};
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.colors.secondaryColor};
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-transform: none;
  }
`;

export { GlobalStyles };
