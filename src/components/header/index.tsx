import * as S from './styles';
import { FaEllipsisV } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '../button';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { MenuMobile } from '../menu/MenuDropdownModal';

export type HeaderProps = {
  boardName: string;
  boardId: string;
  logo: string;
};

export const Header = ({ boardName, boardId, logo }: HeaderProps) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((e) => !e);
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
            <span>{boardName}</span>
            {!show ? (
              <IoMdMenu aria-label="Menu Open" onClick={handleClick} />
            ) : (
              <IoMdClose aria-label="Menu Close" onClick={handleClick} />
            )}
          </h2>
          <div>
            <Button>
              + <span>Adicionar uma Tarefa</span>
            </Button>
            <FaEllipsisV />
          </div>
        </S.BoardControllerHeader>
      </S.Conteiner>
      <MenuMobile show={show} />
    </S.Header>
  );
};
