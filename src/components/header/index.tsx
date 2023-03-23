import * as S from './styles';
import { FaEllipsisV } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '../button';
import { IoMdMenu, IoMdClose } from 'react-icons/io';

export type HeaderProps = {
  boardName: string;
  boardId: string;
  logo: string;
};

export const Header = ({ boardName, boardId, logo }: HeaderProps) => {
  return (
    <S.Conteiner>
      <S.Logo>
        <div>
          <Image src={logo} alt={logo} width={100} height={100} />
        </div>
        <h1>kanban</h1>
      </S.Logo>
      <S.BoardControllerHeader>
        <h2>
          <span>{boardName}</span> <IoMdMenu />
        </h2>
        <div>
          <Button>
            + <span>Adicionar uma Tarefa</span>
          </Button>
          <FaEllipsisV />
        </div>
      </S.BoardControllerHeader>
    </S.Conteiner>
  );
};
