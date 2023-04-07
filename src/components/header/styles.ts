import styled, { css } from 'styled-components';
import { Button } from '../button/styles';

export const Header = styled.header`
  ${({ theme }) => css`
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    display: flex;
    flex-direction: column;
  `}
`;

export const Conteiner = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    padding: 0.1rem 0;
    background-color: ${theme.colors.primaryColor};
    align-items: center;
    gap: 4rem;
    font-size: 2rem;

    ${theme.media_screen_size.phone} {
      font-size: 1.6rem;
      gap: 0;
    }
  `}
`;

export const Logo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    width: 20%;

    ${theme.media_screen_size.phone} {
      width: 20%;
      padding: 1rem;
    }

    & > div {
      width: 4rem;
      height: 4rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    & h1 {
      font-weight: bolder;
      font-size: 3rem;

      ${theme.media_screen_size.phone} {
        display: none;
      }
    }
  `}
`;

export const BoardControllerHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    h2 {
      font-weight: 500;
      font-size: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      svg {
        display: none;

        ${theme.media_screen_size.phone} {
          display: inline-block;
          font-size: 2.7rem;
          color: ${theme.colors.lite_greenColor};
        }
      }

      ${theme.media_screen_size.phone} {
        span {
          font-size: 1.7rem;
        }
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;

      ${Button} {
        transform: translateY(-25%);
        line-height: 100%;
        width: 25rem;

        ${theme.media_screen_size.phone} {
          width: 5rem;
          font-size: 1.7rem;

          span {
            display: none;
          }
        }
      }

      svg {
        margin-right: 3rem;

        ${theme.media_screen_size.phone} {
          margin-right: 1rem;
        }
      }
    }
  `}
`;
