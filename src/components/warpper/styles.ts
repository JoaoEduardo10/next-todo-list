import styled, { css } from 'styled-components';

export const Conteiner = styled.section`
  ${({ theme }) => css`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(32, 9, 121, 1) 57%,
      rgba(0, 212, 255, 1) 100%
    );
    top: 0%;
    left: 0%;
    height: 100vh;
    width: 100%;
  `}
`;
