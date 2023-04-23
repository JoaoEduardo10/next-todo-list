import { useEffect, useState } from 'react';
import { Button } from '../../button';
import * as S from './styles';
import { signOut, useSession } from 'next-auth/react';
import { ConteinerDelete } from '../../forms/conteinerDelete';
import { deleteBoard } from '../../../utils/fecths';
import { TSession } from '../../modal';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { deleteBoard as deleteBoardSlice } from '../../../app/features/Boards/boardSlice';

export type MenuElipsisProps = {
  show: boolean;
  setMenuElipsis: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuElipsis = ({ show, setMenuElipsis }: MenuElipsisProps) => {
  const { data: Session } = useSession() as TSession;
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const dispatch = useAppDispatch();
  const [rendered, setRendered] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setRendered(true);
    }, 500);

    return () => clearTimeout(time);
  }, []);

  const handleMenuElipsiEditClick = () => {
    setMenuElipsis(false);
  };

  const handleMenuElipsiDeleteClick = () => {
    setShowDelete(true);
  };

  const handleSignOut = () => {
    signOut({ redirect: true });
  };

  const handleButtonCancelDelete = () => {
    setShowDelete(false);
  };

  const handleButtonDelete = async () => {
    if (Session) {
      setLoading(true);
      await deleteBoard(Session.acessToken, actualBoard.id);
      dispatch(deleteBoardSlice({ id: actualBoard.id }));
      setLoading(false);
      setShowDelete(false);
    }
  };

  return (
    <S.Conteiner aria-label="MenuElipsis" show={show} rendered={rendered}>
      <ConteinerDelete
        loading={loading}
        showDelete={showDelete}
        rendered={rendered}
        textHeading="Excluir este quadro?"
        textParagraph={`Tem certeza de que deseja excluir o quadro " ${actualBoard.boardName} "? Esta ação removerá todas as colunas e tarefas e não pode ser revertida.`}
        onClickButtonCancel={handleButtonCancelDelete}
        onClickButtonDelete={handleButtonDelete}
      />
      <S.Paragraph
        aria-label="Editar Quadro"
        onClick={handleMenuElipsiEditClick}
      >
        Editar Quadro
      </S.Paragraph>
      <S.Paragraph
        aria-label="Deletar Quadro"
        onClick={handleMenuElipsiDeleteClick}
      >
        Deletar Quadro
      </S.Paragraph>
      <div aria-label="Conteiner Button">
        <Button handleOnClick={handleSignOut}>Sair</Button>
      </div>
    </S.Conteiner>
  );
};
