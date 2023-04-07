import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.secondaryColor};
    height: 100vh;
    width: 100%;
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.secondaryColor};
    height: 100%;
  `}
`;
