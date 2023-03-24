import { useEffect, useState } from 'react';
import * as S from './styles';

export type MenuMobileProps = {
  show: boolean;
};

export const MenuMobile = ({ show }: MenuMobileProps) => {
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setRendering(true);
    }, 500);

    return () => clearTimeout(time);
  }, []);

  return (
    <S.MenuMobile aria-label="Menu" show={show} rendering={rendering}>
      <S.Menu>aaa</S.Menu>
    </S.MenuMobile>
  );
};
