import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export const LoadingCicle1 = styled.div`
  ${({ theme }) => css`
    width: 8rem;
    height: 8rem;
    border: 0.8rem solid ${theme.colors.purpleColor};
    border-top: 0.8rem solid transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: loading 1s ease-in-out infinite;

    @keyframes loading {
      0% {
        transform: rotate(360deg);
      }

      100% {
        transform: rotate(0);
      }
    }
  `}
`;

export const LoadingCicle2 = styled.div`
  ${({ theme }) => css`
    width: 4rem;
    height: 4rem;
    border: 0.6rem solid ${theme.colors.lite_greenColor};
    border-bottom: 0.6rem solid transparent;
    border-radius: 50%;
    animation: loading 1.5s ease-in infinite;


    @keyframes loading {
      0% {
        transform: rotate(360deg);
      }

      100% {
        transform: rotate(0);
      }

  `}
`;
