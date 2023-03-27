import { useEffect, useState } from 'react';
import * as S from './styles';

import { useAppSelector } from '../../app/hooks';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

export type MenuMobileProps = {
  show: boolean;
};

export const MenuMobile = ({ show }: MenuMobileProps) => {
  const [rendering, setRendering] = useState(false);
  const boards = useAppSelector((board) => board.boards);

  useEffect(() => {
    const time = setTimeout(() => {
      setRendering(true);
    }, 500);

    return () => clearTimeout(time);
  }, []);

  return (
    <S.MenuMobile aria-label="Menu" show={show} rendering={rendering}>
      <S.Menu>
        <h2>Todos os quadros ({boards.length})</h2>
        {boards.map((board) => (
          <li key={board.id}>
            {' '}
            <MdOutlineSpaceDashboard /> <span>{board.boardName}</span>
          </li>
        ))}
      </S.Menu>
    </S.MenuMobile>
  );
};
