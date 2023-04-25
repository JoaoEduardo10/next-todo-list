import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      width: 60%;
      border: none;
      padding: 1rem;
      background-color: ${theme.colors.purpleColor};
      color: ${theme.colors.primaryColor};
      border-radius: 1rem;
      cursor: pointer;
      transition: all 300ms ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    }
  `}
`;

export const ConteinerAllInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.6rem;
    width: 100%;
  `}
`;

export const ConteinerInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    & span {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.colors.redColor};
      font-size: 2.7rem;
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    flex: 1;
    border: none;
    outline: none;
    padding: ${theme.padding.small};
    border: 0.1rem solid gray;
    border-radius: 0.5rem;

    &:focus {
      border: 0.1rem solid ${theme.colors.purpleColor};
    }
  `}
`;
