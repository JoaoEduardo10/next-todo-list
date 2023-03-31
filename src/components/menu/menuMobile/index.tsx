import { useEffect, useState } from 'react';
import * as S from './styles';

import { useAppSelector } from '../../../app/hooks';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { TBoard } from '@/src/types';
import { Button } from '../../button';

export type MenuMobileProps = {
  show: boolean;
};

export const MenuMobile = ({ show }: MenuMobileProps) => {
  const boards = useAppSelector((board) => board.boards);
  const [rendering, setRendering] = useState(false);
  const [boardClicked, setboardClicked] = useState('');
  const [primaryRederetionLink, setPrimaryRederitionLink] = useState(false);

  //  não ativa a animação do menu ao entra no site.
  useEffect(() => {
    const time = setTimeout(() => {
      setRendering(true);
      setPrimaryRederitionLink(true);
    }, 500);

    return () => clearTimeout(time);
  }, []);

  //  por padrão fica na primeira board
  useEffect(() => {
    if (boards && boards.length > 0 && primaryRederetionLink) {
      setboardClicked(boards[0].id);
    }
  }, [boards, primaryRederetionLink]);

  const handleClick = (id: string) => {
    setPrimaryRederitionLink(false);
    setboardClicked(id);
  };

  return (
    <S.MenuMobile aria-label="Menu" show={show} rendering={rendering}>
      <S.Menu>
        <h2>Todos os quadros ({boards.length})</h2>
        {boards && boards.length > 0 ? (
          boards.map((board) => (
            <S.Li
              aria-label="Links"
              key={board.id}
              onClick={() => handleClick(board.id)}
              board={boardClicked == board.id ? boardClicked : ''}
              boardId={boardClicked == board.id ? board.id : ''}
            >
              <MdOutlineSpaceDashboard /> <span>{board.boardName}</span>
            </S.Li>
          ))
        ) : (
          <S.ConteinerDiv aria-label="Conteiner Button">
            <Button>Criar um quadro</Button>
          </S.ConteinerDiv>
        )}
      </S.Menu>
    </S.MenuMobile>
  );
};
