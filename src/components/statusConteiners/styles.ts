import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    border-right: 0.1rem solid gray;
    border-top-right-radius: 0.5rem;
    width: 30%;
    gap: 1.6rem;

    ${theme.media_screen_size.phone} {
      width: 100%;
      padding: 0.6rem;
      overflow-y: auto;
    }
  `}
`;

export const Heading = styled.h2`
  ${({ theme }) => css`
    color: gray;

    ${theme.media_screen_size.phone} {
      font-size: 1.6rem;

      padding-top: 1.4rem;
      text-align: center;
    }
  `}
`;
