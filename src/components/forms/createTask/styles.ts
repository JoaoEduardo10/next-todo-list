import styled, { css } from 'styled-components';

import { Label as ConteinerLabel } from '../../inpult/styles';

const ShowTask = (rendering: boolean, show: boolean) => css`
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

export const ConteinerCreateTask = styled.div<{
  show: boolean;
  rendering: boolean;
}>`
  ${({ show, rendering }) => css`
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 25;

    ${ShowTask(rendering, show)}
  `}
`;

export const CreateTaskForm = styled.form`
  ${({ theme }) => css`
    width: 40%;
    height: 90%;
    border-radius: 0.5rem;
    background-color: ${theme.colors.primaryColor};
    padding: ${theme.padding.extra_small};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;

    ${ConteinerLabel} {
      box-shadow: none;
      border: 0.1rem solid #222;
    }

    ${theme.media_screen_size.phone} {
      width: 95%;
    }
  `}
`;

export const Heading = styled.h2`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & span {
      color: ${theme.colors.lite_greenColor};
      display: inline-block;
      font-size: 3.5rem;
      transform: translateY(13%);
    }
  `}
`;

export const ConteinerInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1.6rem 0;
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    margin-bottom: 1rem;
  `}
`;

export const TextArea = styled.textarea`
  ${({ theme }) => css`
    height: 20rem;
    outline: none;
    border: 0.1rem solid #222;
    padding: 0.6rem;
  `}
`;
