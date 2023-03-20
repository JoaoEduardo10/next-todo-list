import { ReactNode } from 'react';
import * as S from './styles';

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  handleOnClick?: () => void;
};

export const Button = ({ children, disabled, handleOnClick }: ButtonProps) => {
  const hendleClick = () => {
    if (handleOnClick) {
      handleOnClick();
    }

    return;
  };

  return (
    <S.Button onClick={hendleClick} disabled={disabled}>
      {children}
    </S.Button>
  );
};
