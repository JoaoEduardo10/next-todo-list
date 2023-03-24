import styled, { css } from 'styled-components';

const showMenu = (show: boolean, rendering: boolean) => css`
  ${show &&
  css`
    animation: showMenu 300ms ease-in-out;
    opacity: 1;

    @keyframes showMenu {
      0% {
        transform: translateX(-100%);
      }

      100% {
        transform: translateX(0);
      }
    }
  `}

  ${!show &&
  css`
    animation: hiddenShow 300ms ease-in-out;

    @keyframes hiddenShow {
      0% {
        transform: translateX(0);
        ${rendering ? 'opacity: 1;' : 'opacity: 0;'}
      }

      100% {
        transform: translateX(-100%);
        opacity: 0;
      }
    }
  `}
`;

export const MenuMobile = styled.div<{ show: boolean; rendering: boolean }>`
  ${({ theme, show, rendering }) => css`
    display: none;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100vh;

    ${theme.media_screen_size.phone} {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;

      ${showMenu(show, rendering)}
    }
  `}
`;

export const Menu = styled.ul`
  ${({ theme }) => css`
    height: 80%;
    width: 80%;
    background-color: ${theme.colors.primaryColor};
    transform: translateY(-7%);
    overflow-y: auto;
  `}
`;
