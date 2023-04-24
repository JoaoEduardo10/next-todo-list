import { useEffect, useState } from 'react';
import * as S from '../createBoard/styles';
import { MessageError } from '../../messageError';
import { Loading } from '../../loading';
import { AiOutlineClose } from 'react-icons/ai';
import { Inpult } from '../../inpult/inpult';
import { Button } from '../../button';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { updateBoard as updateBoardSlice } from '../../../app/features/Boards/boardSlice';
import { updateBoard } from '../../../utils/fecths';
import { useSession } from 'next-auth/react';
import { TSession } from '../../modal';
import { act } from 'react-dom/test-utils';

export type UpdateBoardProps = {
  rendering: boolean;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateBoard = ({ rendering, show, setShow }: UpdateBoardProps) => {
  const { data: Session } = useSession() as TSession;
  const dispatch = useAppDispatch();
  const actuaBoard = useAppSelector((store) => store.boards.actualBoard);
  const [messageError, setMessageError] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueBoardName, setValueBoardName] = useState('');

  useEffect(() => {
    const time = setTimeout(() => {
      if (error) {
        setError(false);
        setMessageError('');
      }
    }, 4000);

    return () => clearTimeout(time);
  }, [error]);

  useEffect(() => {
    setValueBoardName(actuaBoard.boardName);
  }, [actuaBoard, show]);

  const handleShowBoardSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!valueBoardName) {
      setError(true);
      setMessageError('adicione um nome para alterar');
      return;
    }

    setLoading(true);

    const newBoard = await updateBoard(
      Session.acessToken,
      actuaBoard.id,
      valueBoardName,
    );
    dispatch(
      updateBoardSlice({ boardName: newBoard.boardName, id: actuaBoard.id }),
    );

    act(() => {
      setLoading(false);
      setShow(false);
    });
  };

  return (
    <S.ShowBoardConteiner
      aria-label="Update Board"
      rendering={rendering}
      show={show}
    >
      {rendering && <MessageError text={messageError} error={error} />}
      <S.FormBoard role="form" onSubmit={handleShowBoardSubmit}>
        {loading && <Loading />}
        <AiOutlineClose
          aria-label="Close UpdateBoard"
          onClick={() => setShow(false)}
        />
        <h2 role="heading">Editar quadro</h2>
        <Inpult
          placeholder="Nome do Quadro"
          type="text"
          onChange={setValueBoardName}
          value={valueBoardName}
        />
        <S.ConteinerButton>
          <Button>Salvar Alteração</Button>
        </S.ConteinerButton>
      </S.FormBoard>
    </S.ShowBoardConteiner>
  );
};
