import styled, { css } from 'styled-components';

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
  ${({ theme, show, rendering }) => css`
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;

    ${ShowTask(rendering, show)}
  `}
`;

export const CreateTaskForm = styled.form`
  ${({ theme }) => css`
    width: 40%;
    height: 90%;
    border-radius: 0.5rem;
    background-color: ${theme.colors.primaryColor};
  `}
`;

export const Heading = styled.h2`
  ${({ theme }) => css``}
`;

export const TextArea = styled.textarea`
  ${({ theme }) => css``}
`;
