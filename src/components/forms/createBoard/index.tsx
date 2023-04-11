import * as S from './styles';
import { Inpult } from '../../inpult/inpult';
import { Button } from '../../button';
import { AiOutlineClose } from 'react-icons/ai';
import { FormEvent, useEffect, useState } from 'react';
import { createBoard } from '../../../utils/fecths';
import { useSession } from 'next-auth/react';
import { TSession } from '../../modal';

import { useAppDispatch } from '../../../app/hooks';
import { setBoards } from '../../../app/features/Boards/boardSlice';
import { Loading } from '../../loading';
import { MessageError } from '../../messageError';

export type CreateBoardProps = {
  rendering: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  text: string;
  buttonName: string;
};

export const CreateBoard = ({
  rendering,
  setShow,
  show,
  buttonName,
  text,
}: CreateBoardProps) => {
  const dispatch = useAppDispatch();
  const { data: Session } = useSession() as TSession;
  const [valueBoardName, setValueBoardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setError(false);
    }, 4000);

    return () => clearTimeout(time);
  }, [error]);

  const handleShowCreateBoardSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!valueBoardName) {
      setMessageError('Adione um Nome Para o Quadro');
      setError(true);
      return;
    }

    setLoading(true);

    const response = await createBoard(Session.acessToken, valueBoardName);

    dispatch(setBoards(response));

    setLoading(false);
    setShow(false);
  };

  return (
    <S.ShowCreateBoardConteiner
      aria-label="Criação de Quadro"
      rendering={rendering}
      show={show}
    >
      {rendering && <MessageError text={messageError} error={error} />}
      {loading && <Loading />}
      <S.FormCreateBoard
        aria-label="Form"
        onSubmit={handleShowCreateBoardSubmit}
      >
        <AiOutlineClose
          aria-label="Close Board"
          onClick={() => setShow(false)}
        />
        <h2 aria-label="Cabeçalho">{text}</h2>
        <Inpult
          placeholder="Nome do Quadro"
          type="text"
          onChange={setValueBoardName}
          value={valueBoardName}
        />
        <Button>{buttonName}</Button>
      </S.FormCreateBoard>
    </S.ShowCreateBoardConteiner>
  );
};
