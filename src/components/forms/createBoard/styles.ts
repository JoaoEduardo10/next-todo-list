import styled, { css } from 'styled-components';
import { Button } from '../../button/styles';
import { Label } from '../../inpult/styles';

const ShowBoard = (rendering: boolean, show: boolean) => css`
  ${show
    ? css`
        animation: openShow 300ms ease-in-out;
        opacity: 1;

        @keyframes openShow {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }

          100% {
            transform: translate(0);
          }
        }
      `
    : css`
        visibility: hidden;
        animation: closeShow 300ms ease-in-out;
        opacity: 0;

        @keyframes closeShow {
          0% {
            transform: translateX(0);
            opacity: ${rendering ? '1' : '0'};
            visibility: visible;
          }

          100% {
            transform: translate(-100%);
            visibility: hidden;
          }
        }
      `}
`;

export const ShowBoardConteiner = styled.div<{
  rendering: boolean;
  show: boolean;
}>`
  ${({ theme, rendering, show }) => css`
    position: fixed;
    top: 0%;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;

    ${ShowBoard(rendering, show)}
  `}
`;

export const FormBoard = styled.form`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.primaryColor};
    height: 60%;
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: ${theme.padding.small};
    gap: 1.6rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;

    & > svg {
      position: absolute;
      top: 10%;
      right: 5%;
      font-size: 2.5rem;
      color: ${theme.colors.purpleColor};
      cursor: pointer;
    }

    ${Button} {
      width: 50%;
    }

    ${Label} {
      width: 80%;
    }
  `}
`;
