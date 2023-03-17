import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    background-color: #fff;
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
