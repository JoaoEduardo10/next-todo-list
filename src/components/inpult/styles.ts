import styled, { css, DefaultTheme } from 'styled-components';

const animationLabel = (boolean: boolean, theme: DefaultTheme) => css`
  box-shadow: ${boolean && `1rem 1rem 3rem ${theme.colors.purpleColor}`};
  transform: ${boolean && 'scale(1.1)'};
`;

export const input = styled.input`
  ${({ theme }) => css`
    width: 80%;
    padding: ${theme.padding.small};
    border: none;
    background-color: ${theme.colors.primaryColor};
    background-color: red;
    outline: none;
    line-height: 1.2;
    font-size: 1.7rem;
  `}
`;

export const Label = styled.label<{ animation: boolean }>`
  ${({ theme, animation }) => css`
    width: 50%;
    display: flex;
    padding: 0 ${theme.padding.small};
    border: none;
    background-color: ${theme.colors.primaryColor};
    gap: 0.5rem;
    box-shadow: 1rem 1rem 1.6rem ${theme.colors.secondaryColor};
    border-radius: 0.9rem;
    justify-content: space-between;
    align-items: center;
    line-height: 1.2;
    transition: all 300ms ease-in;

    ${animationLabel(animation, theme)}

    svg {
      font-size: 2.6rem;
    }
  `}
`;
