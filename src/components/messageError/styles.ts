import styled, { css, DefaultTheme } from 'styled-components';

const errorExist = (theme: DefaultTheme, messageError: boolean) => css`
  ${messageError &&
  `
  opacity: 1;
  animation: showMessage 300ms ease-in-out;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 2.6%;
    height: 0.2rem;
    background-color: ${theme.colors.lite_greenColor};
    animation: hidenBarMessage 3.8s ease-in-out;
    width: 0%;
  }

  @keyframes hidenBarMessage {
    0% {
      width: 95%;
    }

    100% {
      width: 0%;
    }
  }

  @keyframes showMessage {
    0% {
      transform: translateX(500%);
    }

    100% {
      transform: translateX(0);
    }
  }
  `}
`;

const errorMessageNotExist = (messageError: boolean) => css`
  ${!messageError &&
  `
  animation: hidenShowMessageError 1s ease-in-out;

    @keyframes hidenShowMessageError {
      0% {
        opacity: 1;
        transform: translateX(0%);
      }

      25% {

        transform: translateX(-20%);
      }

      100% {
        transform: translateX(500%);
        opacity: 0.7;
      }
    }

  `}
`;

export const MessageError = styled.div<{ messageError: boolean }>`
  ${({ theme, messageError }) => css`
    position: fixed;
    z-index: 3;
    background-color: ${theme.colors.redColor};
    width: 40rem;
    height: 5rem !important;
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
    padding: ${theme.padding.small};
    border-radius: 1.6rem;
    opacity: 0;
    transition: all 300ms ease-in-out;

    & span {
      position: relative;
      display: flex;
      height: 100%;
      align-items: center;

      & svg {
        color: ${theme.colors.secondaryColor};
      }
    }

    & span.icon {
      &::before {
        content: '';
        position: absolute;
        right: -50%;
        width: 0.2rem;
        height: 4rem;
        border-radius: 0.5rem;
        background-color: #d9bf6c;
      }
    }

    ${theme.media_screen_size.lapTop} {
      top: 10%;
    }

    ${theme.media_screen_size.tablet} {
      top: 10%;
      height: 17rem;
      width: 90%;
      font-size: 3.5rem;
    }

    ${theme.media_screen_size.phone} {
      top: 10%;
      width: 81%;
    }

    ${errorExist(theme, messageError)}
    ${errorMessageNotExist(messageError)}
  `}
`;
