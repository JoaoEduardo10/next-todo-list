import styled, { css } from 'styled-components';
import { Button } from '../button/styles';

export const Conteiner = styled.header`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    padding: 0.1rem 0;
    background-color: ${theme.colors.primaryColor};
    align-items: center;
    gap: 4rem;
    font-size: 2rem;
  `}
`;

export const Logo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    width: 20%;

    & > div {
      width: 4rem;
      height: 4rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    & span {
      font-weight: bolder;
      font-size: 3rem;
    }
  `}
`;

export const BoardControllerHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    div:nth-child(1) {
      font-weight: 500;
      font-size: 2rem;
    }

    div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;

      ${Button} {
        transform: translateY(-25%);
        line-height: 100%;
        width: 25rem;
      }

      svg {
        margin-right: 3rem;
      }
    }
  `}
`;
