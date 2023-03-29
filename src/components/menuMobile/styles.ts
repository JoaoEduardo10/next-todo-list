import styled, { css, DefaultTheme } from 'styled-components';

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

const boardClicled = (
  board: string,
  boardId: string,
  theme: DefaultTheme,
) => css`
  ${board == boardId &&
  `
    background-color: ${theme.colors.purpleColor};
    transition: all 300ms ease-in-out;

    span {
      color: ${theme.colors.primaryColor};
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
    display: flex;
    flex-direction: column;

    h2 {
      margin: 2rem 0;
      padding: ${theme.padding.small};
    }
  `}
`;

export const Li = styled.li<{ board: string; boardId: string }>`
  ${({ theme, board, boardId }) => css`
    margin-bottom: ${theme.padding.small};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 0 100px 100px 0;
    width: 90%;
    padding: 15px 24px;
    background-color: transparent;

    svg {
      font-size: 2rem;
      transform: translateY(8%);
    }

    span {
      font-size: 1.7rem;
      font-weight: bold;
      color: gray;
    }

    ${boardId.length > 1 && boardClicled(board, boardId, theme)}
  `}
`;
