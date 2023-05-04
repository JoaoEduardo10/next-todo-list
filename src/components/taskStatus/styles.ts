import styled, { css } from 'styled-components';

export const Conteiner = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `}
`;

export const Heading = styled.h3`
  ${({ theme }) => css`
    margin: 1rem 0;
    color: gray;
    font-size: 1.6rem;
  `}
`;

export const Select = styled.select`
  ${({ theme }) => css`
    margin-top: 0.6rem;
    padding: 1.6rem;
    outline: none;
    appearance: none;
    background-image: url(/images/icon-chevron-down.svg);
    background-position: right 16px top 50%;
    background-repeat: no-repeat;
    background-color: ${theme.colors.primaryColor};
    border: 0.1rem solid ${theme.colors.purpleColor};
    border-radius: 0.4rem;
    color: ${theme.colors.blackColor};
    font-weight: bold;
    font-size: ${theme.padding.small};
  `}
`;

export const Option = styled.option`
  ${({ theme }) => css``}
`;
