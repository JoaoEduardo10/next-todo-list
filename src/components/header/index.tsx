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
        <span>kanban</span>
      </S.Logo>
      <S.BoardControllerHeader>
        <div>{boardName}</div>
        <div>
          <Button>+ Adicionar uma Tarefa</Button>
          <FaEllipsisV />
        </div>
      </S.BoardControllerHeader>
    </S.Conteiner>
  );
};
