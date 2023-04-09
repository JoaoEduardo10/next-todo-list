import styled, { css } from 'styled-components';
import { Conteiner as Loading } from '../loading/styles';

export const Conteiner = styled.section`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    background-color: transparent;
    padding: 1rem;

    ${theme.media_screen_size.phone} {
      padding: 0;
    }

    & ${Loading} {
      position: absolute;
    }
  `}
`;

export const NotBoard = styled.section`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: transparent;

    ${theme.media_screen_size.phone} {
      padding: 0;
    }

    & ${Loading} {
      position: absolute;
    }
  `}
`;
