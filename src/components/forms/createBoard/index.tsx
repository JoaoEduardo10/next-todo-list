import * as S from './styles';
import { Inpult } from '../../inpult/inpult';
import { Button } from '../../button';
import { AiOutlineClose } from 'react-icons/ai';
import { FormEvent, useEffect, useState } from 'react';
import { board } from '../../../utils/fecths';
import { useSession } from 'next-auth/react';
import { TSession } from '../../modal';

import { useAppDispatch } from '../../../app/hooks';
import { setBoards } from '../../../app/features/Boards/boardSlice';
import { Loading } from '../../loading';
import { MessageError } from '../../messageError';
import { act } from 'react-dom/test-utils';

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

  const handleShowBoardSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!valueBoardName) {
      setMessageError('Adione um Nome Para o Quadro');
      setError(true);
      return;
    }

    setLoading(true);

    const response = await board(Session.acessToken, valueBoardName);

    dispatch(setBoards(response));

    act(() => {
      setValueBoardName('');
      setLoading(false);
    });
    setShow(false);
  };

  return (
    <S.ShowBoardConteiner
      aria-label="Dynamic Board"
      rendering={rendering}
      show={show}
    >
      {rendering && <MessageError text={messageError} error={error} />}
      {loading && <Loading />}
      <S.FormBoard role="form" onSubmit={handleShowBoardSubmit}>
        <AiOutlineClose
          aria-label="Close DynamicBoard"
          onClick={() => setShow(false)}
        />
        <h2 role="heading">{text}</h2>
        <Inpult
          placeholder="Nome do Quadro"
          type="text"
          onChange={setValueBoardName}
          value={valueBoardName}
        />
        <Button>{buttonName}</Button>
      </S.FormBoard>
    </S.ShowBoardConteiner>
  );
};
