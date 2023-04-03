import styled, { css } from 'styled-components';

export const Conteiner = styled.div<{ show: boolean }>`
  ${({ theme, show }) => css`
    position: fixed;
    right: 2%;
    top: 10%;
    width: 15.5rem;
    background-color: ${theme.colors.primaryColor};
    padding: ${theme.padding.small};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${theme.colors.secondaryColor};
  `}
`;

export const Paragraph = styled.p`
  ${({ theme }) => css`
    color: gray;
    cursor: pointer;

    &:nth-child(2) {
      color: ${theme.colors.redColor};
    }
  `}
`;
