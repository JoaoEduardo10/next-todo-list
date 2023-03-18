import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${({ theme }) => css`
    margin-top: 3rem;
    width: 16rem;
    padding: ${theme.padding.small};
    background-color: ${theme.colors.purpleColor};
    border: none;
    border-radius: 1.6rem;
    font-size: 1.8rem;
    line-height: 100%;
    color: ${theme.colors.primaryColor};
    cursor: pointer;
    transition: all 300ms ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
    &:disabled {
      background-color: ${theme.colors.secondaryColor};
      cursor: not-allowed;
      color: ${theme.colors.blackColor};
      transform: scale(1);
    }
  `}
`;
