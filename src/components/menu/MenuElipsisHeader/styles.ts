import styled, { css } from 'styled-components';
import { Button } from '../../button/styles';

const handleShow = (show: boolean, rendered: boolean) => css`
  ${show
    ? css`
        opacity: 1;
        animation: openShow 300ms ease-in-out;

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
        opacity: 0;
        animation: closeShow 0.5s ease-in-out;
        visibility: hidden;

        @keyframes closeShow {
          0% {
            transform: translateX(0);
            opacity: ${rendered ? '1' : '0'};
            visibility: visible;
          }

          25% {
            transform: translateX(-40%);
          }

          99% {
          }

          100% {
            transform: translate(100%);
            visibility: hidden;
          }
        }
      `}
`;

export const Conteiner = styled.div<{ show: boolean; rendered: boolean }>`
  ${({ theme, show, rendered }) => css`
    position: fixed;
    right: 2%;
    top: 15%;
    width: 15.5rem;
    background-color: ${theme.colors.primaryColor};
    padding: ${theme.padding.small};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 0.5rem;
    border: 0.2rem solid ${theme.colors.secondaryColor};
    box-shadow: 0rem 0rem 4.9rem ${theme.colors.blackColor};
    opacity: 0;
    z-index: 10;

    & div {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      & ${Button} {
        width: 100%;
        height: 100%;
      }
    }

    ${handleShow(show, rendered)}
  `}
`;

export const Paragraph = styled.p`
  ${({ theme }) => css`
    color: gray;
    cursor: pointer;
    transition: all 300ms ease-in-out;

    &:nth-child(2) {
      color: ${theme.colors.redColor};
    }

    &:hover {
      transform: scale(1.1);
    }
  `}
`;
