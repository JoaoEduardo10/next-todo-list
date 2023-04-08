import styled, { css } from 'styled-components';

import { MenuDropdownModal } from '../components/menu/MenuDropdownModal/styles';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.secondaryColor};
    height: 100vh;
    width: 100%;
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.secondaryColor};
    height: 100%;

    ${theme.media_screen_size.phone} {
      ${MenuDropdownModal} {
        display: none;
      }
      position: absolute;
      top: 11%;
      display: block;
      height: 100%;
      z-index: 0;
      width: 100%;
    }
  `}
`;
