import styled, { css } from 'styled-components';

export const TasksConteiner = styled.ul`
  ${({ theme }) => css`
    background-color: transparent;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.padding.small};
  `}
`;

export const Tasks = styled.li`
  ${({ theme }) => css`
    background-color: ${theme.colors.primaryColor};
    width: 100%;
    padding: ${theme.padding.small};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;

    &:hover h3 {
      color: ${theme.colors.purpleColor};
    }
  `}
`;

export const Heading = styled.h3`
  ${({ theme }) => css``}
`;

export const SubText = styled.p`
  ${({ theme }) => css`
    font-size: 1.4rem;
    color: gray;
  `}
`;
