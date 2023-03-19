import { ReactNode } from 'react';
import * as S from './styles';

export type WarpperProps = {
  children: ReactNode;
};

export const Warpper = ({ children }: WarpperProps) => {
  return <S.Conteiner>{children}</S.Conteiner>;
};
