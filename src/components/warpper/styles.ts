import styled, { css } from 'styled-components';

export const Conteiner = styled.section`
  ${({ theme }) => css`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/images/bg-signIN-end-signUp.jpg');
    background-position: center;
    background-size: cover;
  `}
`;
