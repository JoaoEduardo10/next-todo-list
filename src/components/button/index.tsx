import { ReactNode } from 'react';
import * as S from './styles';

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const Button = ({ children, disabled }: ButtonProps) => {
  return <S.Button disabled={disabled}>{children}</S.Button>;
};
