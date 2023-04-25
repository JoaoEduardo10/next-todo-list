import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    margin-top: 2rem;
  `}
`;

export const ConteinerAllInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.6rem;
  `}
`;

export const ConteinerInput = styled.div`
  ${({ theme }) => css``}
`;

export const Input = styled.input`
  ${({ theme }) => css``}
`;
