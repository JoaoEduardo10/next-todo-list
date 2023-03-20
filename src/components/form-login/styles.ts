import styled, { css } from 'styled-components';

import { Label } from '../inpult/styles';
import { Button } from '../button/styles';

export const Form = styled.form`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryColor};
    width: 40%;
    height: 95%;
    padding: ${theme.padding.large};
    display: flex;
    flex-direction: column;
    gap: 4rem;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.1rem 0.2rem ${theme.colors.primaryColor};
    align-items: center;

    ${theme.media_screen_size.phone} {
      width: 90%;
      padding: ${theme.padding.small};
      justify-content: center;

      ${Label} {
        width: 100%;
      }
    }

    ${theme.media_screen_size.tablet} {
      justify-content: center;
      width: 80%;
      padding: 0 ${theme.padding.large};

      ${Label}:nth-child(2) {
        margin-bottom: 7rem;
      }

      ${Label} {
        height: 10rem;

        & input {
          font-size: 3.6rem;
        }

        & svg {
          font-size: 4.4rem;
        }
      }

      ${Button} {
        width: 50%;
        height: 10rem;
        font-size: 4rem;
      }

      a {
        font-size: 3rem;
      }
    }

    ${theme.media_screen_size.lapTop} {
      justify-content: center;

      ${Label}:nth-child(2) {
        margin-bottom: 4rem;
      }

      ${Label} {
        height: 7rem;
        width: 100%;

        & input {
          font-size: 2.6rem;
        }

        & svg {
          font-size: 3.4rem;
        }
      }

      ${Button} {
        width: 90%;
        height: 9rem;
        font-size: 3rem;
      }

      a {
        font-size: 2.4rem;
      }
    }

    & a {
      color: ${theme.colors.blackColor};
      text-decoration: none;
      padding: ${theme.padding.small};
      transition: all 300ms ease-in-out;

      &:hover {
        color: ${theme.colors.purpleColor};
        text-decoration: underline;
      }
    }
  `}
`;

export const Heading = styled.h1`
  ${({ theme }) => css`
    margin-bottom: 6rem;
    color: ${theme.colors.purpleColor};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3.8rem;

    ${theme.media_screen_size.tablet} {
      font-size: 8rem;
    }

    ${theme.media_screen_size.lapTop} {
      font-size: 5.6rem;
    }
  `}
`;
