import { useEffect, useState } from 'react';
import * as S from './styles';

import { useAppSelector } from '../../../app/hooks';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { TBoard } from '@/src/types';
import { Button } from '../../button';

export type MenuDropdownModalProps = {
  show: boolean;
};

export const MenuDropdownModal = ({ show }: MenuDropdownModalProps) => {
  const boards = useAppSelector((state) => state.boards);
  const [rendering, setRendering] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState('');

  // para não aparecer o menu ao renderizar o site
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRendering(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // para ja fica selecionado um link ao redenrizar o site
  useEffect(() => {
    if (boards.length > 0) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards]);

  function handleBoardClick(boardId: string) {
    setSelectedBoardId(boardId);
  }

  return (
    <S.MenuDropdownModal aria-label="Menu" show={show} rendering={rendering}>
      <S.Menu>
        <h2>Todos os quadros ({boards.length})</h2>
        {boards.length > 0 ? (
          boards.map((board) => (
            <S.Li
              aria-label="Link"
              key={board.id}
              onClick={() => handleBoardClick(board.id)}
              board={selectedBoardId === board.id ? selectedBoardId : ''}
              boardId={selectedBoardId === board.id ? board.id : ''}
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
    </S.MenuDropdownModal>
  );
};
