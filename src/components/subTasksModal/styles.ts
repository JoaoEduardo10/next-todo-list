import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.padding.extra_small};
    display: flex;
    flex-direction: column;
  `}
`;

export const Heading = styled.h3`
  ${({ theme }) => css`
    margin: ${theme.padding.small} 0;
    color: gray;
    font-size: 1.6rem;
  `}
`;

export const ConteinerInput = styled.div`
  ${({ theme }) => css`
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: ${theme.colors.secondaryColor};
    display: flex;
    gap: ${theme.padding.small};
    align-items: center;

    &:hover {
      background-color: ${theme.colors.purpleColor};
      opacity: background-color 0.4;
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: ${theme.padding.small};
    height: ${theme.padding.small};
    transform: scale(1.2);
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-weight: bold;
    text-decoration: none;

    ${Input}:checked ~ & {
      text-decoration: line-through;
      font-weight: 400;
    }
  `}
`;
