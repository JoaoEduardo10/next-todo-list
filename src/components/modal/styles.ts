import styled, { css } from 'styled-components';
import { Conteiner as Loading } from '../loading/styles';

export const Conteiner = styled.section`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;

    & ${Loading} {
      position: absolute;
    }
  `}
`;
