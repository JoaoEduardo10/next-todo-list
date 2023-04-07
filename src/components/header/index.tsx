import * as S from './styles';
import { FaEllipsisV } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '../button';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { MenuDropdownModal } from '../menu/MenuDropdownModal';
import { MenuElipsis } from '../menu/MenuElipsis';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setActualBoard } from '../../app/features/Boards/boardSlice';

export type HeaderProps = {
  logo: string;
};

export const Header = ({ logo }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const boards = useAppSelector((store) => store.boards.allBoards);
  const [menuDropdownModalShow, setMenuDropdownModalShow] = useState(false);
  const [menuElipsisShow, setMenuElipsis] = useState(false);

  useEffect(() => {
    dispatch(setActualBoard(boards[0]));
  }, []);

  const handleMenuDropdownModalShowClick = () => {
    setMenuDropdownModalShow((e) => !e);
  };

  const handleMenuElipsisShowClick = () => {
    setMenuElipsis((e) => !e);
  };

  return (
    <S.Header>
      <S.Conteiner aria-label="Cabeçalho">
        <S.Logo>
          <div>
            <Image src={logo} alt={logo} width={100} height={100} />
          </div>
          <h1>kanban</h1>
        </S.Logo>
        <S.BoardControllerHeader>
          <h2>
            <span>{actualBoard ? actualBoard.boardName : ''}</span>
            {!menuDropdownModalShow ? (
              <IoMdMenu
                aria-label="Menu Open"
                onClick={handleMenuDropdownModalShowClick}
              />
            ) : (
              <IoMdClose
                aria-label="Menu Close"
                onClick={handleMenuDropdownModalShowClick}
              />
            )}
          </h2>
          <div>
            <Button>
              + <span>Adicionar uma Tarefa</span>
            </Button>
            {menuElipsisShow ? (
              <IoMdClose
                aria-label="Menu Open/Elipsis"
                onClick={handleMenuElipsisShowClick}
              />
            ) : (
              <FaEllipsisV
                aria-label="Menu Close/Elipsis"
                onClick={handleMenuElipsisShowClick}
              />
            )}
          </div>
        </S.BoardControllerHeader>
      </S.Conteiner>
      <MenuDropdownModal show={menuDropdownModalShow} />
      <MenuElipsis show={menuElipsisShow} setMenuElipsis={setMenuElipsis} />
    </S.Header>
  );
};
