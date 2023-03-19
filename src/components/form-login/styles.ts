import styled, { css } from 'styled-components';

export const Form = styled.form`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryColor};
    width: 40%;
    height: 90%;
    padding: ${theme.padding.large};
    display: flex;
    flex-direction: column;
    gap: 4rem;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.1rem 0.2rem ${theme.colors.primaryColor};
    align-items: center;
  `}
`;

export const Heading = styled.h1`
  ${({ theme }) => css`
    margin-bottom: 6rem;
    color: ${theme.colors.purpleColor};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3.8rem;
  `}
`;
