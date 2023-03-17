import styled, { css } from 'styled-components';

export const Conteiner = styled.form`
  ${({ theme }) => css`
    background-color: ${theme.colors.primaryColor};
    width: 40%;
    height: 90%;
    padding: ${theme.padding.extra_big};
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.1rem 0.9rem ${theme.colors.secondaryColor};
    align-items: center;
  `}
`;
