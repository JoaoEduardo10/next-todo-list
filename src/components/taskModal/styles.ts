import styled, { css } from 'styled-components';
import { ShowTask } from '../forms/createTask/styles';
import { Heading } from '../forms/createTask/styles';

export const Conteiner = styled.div<{ rendering: boolean; show: boolean }>`
  ${({ rendering, show }) => css`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    ${ShowTask(rendering, show)}
  `}
`;

export const TaskModal = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primaryColor};
    width: 40%;
    height: 60%;
    padding: ${theme.padding.extra_small};
    border-radius: 0.5rem;

    ${Heading} {
      svg {
        cursor: pointer;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.1rem;
      }
    }
  `}
`;
