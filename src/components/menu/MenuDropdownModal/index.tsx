import { useEffect, useState } from 'react';
import * as S from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { Button } from '../../button';
import { TBoard } from '@/src/types';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setActualBoard as setcatualBoardDispatch } from '../../../app/features/Boards/boardSlice';
import { Board } from '../../forms/board';

export type MenuDropdownModalProps = {
  show: boolean;
};

export const MenuDropdownModal = ({ show }: MenuDropdownModalProps) => {
  const boards = useAppSelector((state) => state.boards.allBoards);
  const dispatch = useAppDispatch();
  const [rendering, setRendering] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [actualBoard, setActualBoard] = useState<TBoard>();
  const [showBoard, setShowBoard] = useState(false);

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
      setActualBoard(boards[0]);
    }
  }, [boards]);

  useEffect(() => {
    if (actualBoard) {
      dispatch(setcatualBoardDispatch(actualBoard));
    }
  }, [actualBoard]);

  function handleBoardClick(boardId: string) {
    setSelectedBoardId(boardId);

    boards.map((board) => {
      if (boardId == board.id) {
        setActualBoard(board);
      }
    });
  }

  return (
    <>
      <Board
        text="Adicionar quadros"
        rendering={rendering}
        setShow={setShowBoard}
        show={showBoard}
        buttonName="Criar novo Quadro"
      />
      <S.MenuDropdownModal aria-label="Menu" show={show} rendering={rendering}>
        <S.Menu>
          <h2>Todos os quadros ({boards.length})</h2>
          {boards.length > 0 ? (
            <>
              {boards.map((board) => (
                <S.Li
                  aria-label="Link"
                  key={board.id}
                  onClick={() => handleBoardClick(board.id)}
                  board={selectedBoardId === board.id ? selectedBoardId : ''}
                  boardId={selectedBoardId === board.id ? board.id : ''}
                >
                  <MdOutlineSpaceDashboard /> <span>{board.boardName}</span>
                </S.Li>
              ))}
              <S.Li board="" boardId="" aria-label="Creie um Quadro">
                <div
                  aria-label="Conteiner Text Create"
                  className="Create_Board"
                  onClick={() => setShowBoard(true)}
                >
                  <MdOutlineSpaceDashboard /> <span>+ Criar um Quadro</span>
                </div>
              </S.Li>
            </>
          ) : (
            <S.ConteinerDiv aria-label="Conteiner Button">
              <Button handleOnClick={() => setShowBoard(true)}>
                Criar um quadro
              </Button>
            </S.ConteinerDiv>
          )}
        </S.Menu>
      </S.MenuDropdownModal>
    </>
  );
};
