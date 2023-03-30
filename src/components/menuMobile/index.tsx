import { useEffect, useState } from 'react';
import * as S from './styles';

import { useAppSelector } from '../../app/hooks';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

export type MenuMobileProps = {
  show: boolean;
};

export const MenuMobile = ({ show }: MenuMobileProps) => {
  const boards = useAppSelector((boards) => boards.boards);
  const [rendering, setRendering] = useState(false);
  const [boardClicked, setboardClicked] = useState('');

  useEffect(() => {
    const time = setTimeout(() => {
      setRendering(true);
    }, 500);

    const [primaryBoard] = boards;

    setboardClicked(primaryBoard.id);

    return () => clearTimeout(time);
  }, []);

  return (
    <S.MenuMobile aria-label="Menu" show={show} rendering={rendering}>
      <S.Menu>
        <h2>Todos os quadros ({boards.length})</h2>
        {boards.map((board) => (
          <S.Li
            aria-label="Links"
            key={board.id}
            onClick={() => setboardClicked(board.id)}
            board={boardClicked == board.id ? boardClicked : ''}
            boardId={boardClicked == board.id ? board.id : ''}
          >
            <MdOutlineSpaceDashboard /> <span>{board.boardName}</span>
          </S.Li>
        ))}
      </S.Menu>
    </S.MenuMobile>
  );
};
