import styled, { css } from 'styled-components';
import { Button } from '../../button/styles';

const showDelete = (show: boolean, rendered: boolean) => css`
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
            opacity: ${rendered ? '1' : '0'};
            visibility: visible;
          }

          100% {
            transform: translate(-100%);
            visibility: hidden;
          }
        }
      `}
`;

export const Conteiner = styled.div<{ show: boolean; rendered: boolean }>`
  ${({ show, rendered }) => css`
    position: fixed;
    top: 0%;
    left: 0%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;

    ${showDelete(show, rendered)}
  `}
`;

export const ConteinerDelete = styled.section`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.primaryColor};
    width: 40%;
    border-radius: 0.5rem;
    padding: ${theme.padding.extra_small};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

export const Heading = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.redColor};
    font-weight: bold;
    margin-bottom: 1.6rem;
  `}
`;

export const Paragraph = styled.p`
  ${() => css`
    color: gray;
  `}
`;

export const ConteinerButton = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 50%;
    gap: 1.6rem;

    ${Button} {
      width: 100%;
      border-radius: 5rem;
      transition: 300ms ease-in-out;

      &:nth-child(1) {
        background-color: ${theme.colors.redColor};
        transition: 300ms ease-in-out;

        &:hover {
          background-color: transparent;
          border: 0.2rem solid ${theme.colors.redColor};
          color: ${theme.colors.redColor};
        }
      }

      &:nth-child(2) {
        background-color: ${theme.colors.secondaryColor};
        color: ${theme.colors.purpleColor};

        &:hover {
          border: 0.2rem solid ${theme.colors.purpleColor};
        }
      }

      &:hover {
        transform: scale(1);
      }
    }
  `}
`;
