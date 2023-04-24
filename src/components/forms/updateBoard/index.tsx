import { ReactNode, useEffect, useState } from 'react';
import * as S from '../createBoard/styles';
import { MessageError } from '../../messageError';
import { Loading } from '../../loading';
import { AiOutlineClose } from 'react-icons/ai';
import { Inpult } from '../../inpult/inpult';
import { Button } from '../../button';
import { useAppSelector } from '@/src/app/hooks';

export type UpdateBoardProps = {
  rendering: boolean;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateBoard = ({ rendering, show, setShow }: UpdateBoardProps) => {
  const [messageError, setMessageError] = useState('');
  const actuaBoard = useAppSelector((store) => store.boards.actualBoard);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueBoardName, setValueBoardName] = useState('');

  useEffect(() => {
    setValueBoardName(actuaBoard.boardName);
  }, [actuaBoard]);

  const handleShowBoardSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
