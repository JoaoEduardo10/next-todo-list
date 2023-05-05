import * as S from './styles';
import { FaEllipsisV } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '../button';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { MenuDropdownModal } from '../menu/MenuDropdownModal';
import { MenuElipsisHeader } from '../menu/MenuElipsisHeader';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setActualBoard } from '../../app/features/Boards/boardSlice';
import { CreateTasks } from '../forms/createTask';

export type HeaderProps = {
  logo: string;
};

export const Header = ({ logo }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const boards = useAppSelector((store) => store.boards.allBoards);
  const [menuDropdownModalShow, setMenuDropdownModalShow] = useState(false);
  const [menuElipsisShow, setMenuElipsisHeader] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    if (boards.length > 0) {
      dispatch(setActualBoard(boards[0]));
    }

    const time = setTimeout(() => {
      setRendering(true);
    }, 500);

    return () => clearTimeout(time);
  }, []);

  const handleMenuDropdownModalShowClick = () => {
    setMenuDropdownModalShow((e) => !e);
  };

  const handleMenuElipsisHeaderShowClick = () => {
    setMenuElipsisHeader((e) => !e);
  };

  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  return (
    <S.Header>
      <CreateTasks
        show={showCreateTask}
        setShowCreateTask={setShowCreateTask}
        rendering={rendering}
      />
      <S.Conteiner aria-label="Cabeçalho do site">
        <S.Logo>
          <div>
            <Image src={logo} alt={logo} width={100} height={100} />
          </div>
          <h1>kanban</h1>
        </S.Logo>
        <S.BoardControllerHeader>
          <h2>
            <span aria-label="Nome do Quadro atual">
              {actualBoard.boardName.length > 0
                ? actualBoard.boardName
                : 'não ha quadros criados!'}
            </span>
            {!menuDropdownModalShow ? (
              <IoMdMenu
                aria-label="Menu Open/DropdownModal"
                onClick={handleMenuDropdownModalShowClick}
              />
            ) : (
              <IoMdClose
                aria-label="Menu Close/DropdownModal"
                onClick={handleMenuDropdownModalShowClick}
              />
            )}
          </h2>
          <div>
            <Button handleOnClick={handleCreateTask}>
              + <span>Adicionar uma Tarefa</span>
            </Button>
            {menuElipsisShow ? (
              <IoMdClose
                aria-label="Close/Elipsis"
                onClick={handleMenuElipsisHeaderShowClick}
              />
            ) : (
              <FaEllipsisV
                aria-label="Open/Elipsis"
                onClick={handleMenuElipsisHeaderShowClick}
              />
            )}
          </div>
        </S.BoardControllerHeader>
      </S.Conteiner>
      <S.ConteinerMenus>
        <MenuDropdownModal show={menuDropdownModalShow} />
      </S.ConteinerMenus>
      <MenuElipsisHeader
        show={menuElipsisShow}
        setMenuElipsisHeader={setMenuElipsisHeader}
      />
    </S.Header>
  );
};
