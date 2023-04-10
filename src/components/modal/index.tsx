import { useEffect, useState } from 'react';
import * as S from './styles';

import { Loading } from '../loading';
import { getBoardWithTasks } from '../../utils/fecths';

import { useSession } from 'next-auth/react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setActualBoardWithTasks } from '../../app/features/Boards/boardSlice';
import { StatusConteiner } from '../statusConteiners';

export type TSession = {
  data: {
    user: {
      name: string;
    };
    acessToken: string;
    expires: string;
  };
  status: 'authenticated' | 'loading' | 'unauthenticated';
};

export const Modal = () => {
  const { data: Session } = useSession() as TSession;
  const dispatch = useAppDispatch();
  const actualBoardWithTasks = useAppSelector(
    (store) => store.boards.actualBoardWithTasks,
  );
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Session) {
      const request = async () => {
        setLoading(true);

        const response = await getBoardWithTasks(
          Session.acessToken,
          actualBoard.id,
        );

        dispatch(setActualBoardWithTasks(response));
        setLoading(false);
      };

      request();
    }
  }, [actualBoard, Session]);

  if (actualBoard.id == '') {
    return (
      <S.NotBoard aria-label="Sem Quadros">
        <h2>Não há quadros!</h2>
      </S.NotBoard>
    );
  }

  return (
    <S.Conteiner aria-label="Modal">
      {loading && <Loading />}
      <StatusConteiner heading="pending" tasks={actualBoardWithTasks.tasks} />
      <StatusConteiner heading="progress" tasks={actualBoardWithTasks.tasks} />
      <StatusConteiner heading="concluded" tasks={actualBoardWithTasks.tasks} />
    </S.Conteiner>
  );
};
