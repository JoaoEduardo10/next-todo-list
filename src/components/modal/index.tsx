import { ReactNode, useEffect, useState } from 'react';
import * as S from './styles';

import { Loading } from '../loading';
import { getBoardWithTasks } from '../../utils/fecths';

import { useSession } from 'next-auth/react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setActualBoardWithTasks } from '../../app/features/Boards/boardSlice';
import { StatusConteiner } from '../statusConteiners';
import { TTasks } from '@/src/types';
import { returnTasksByStatus } from '@/src/utils/utilsFactions';

export type ModalProps = {
  children: ReactNode;
};

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
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const actualBoardWithTasks = useAppSelector(
    (store) => store.boards.actualBoardWithTasks,
  );
  const [loading, setLoading] = useState(false);
  const [tasksConcluided, setTasksConcluided] = useState<TTasks[]>([]);
  const [tasksPending, setTasksPending] = useState<TTasks[]>([]);
  const [tasksProgress, setTasksProgress] = useState<TTasks[]>([]);

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

  useEffect(() => {
    if (actualBoardWithTasks && actualBoardWithTasks.tasks) {
      const { tasksConcluidedFilter, tasksPendingFilter, tasksProgressFilter } =
        returnTasksByStatus(actualBoardWithTasks.tasks);

      setTasksConcluided(tasksConcluidedFilter);
      setTasksPending(tasksPendingFilter);
      setTasksProgress(tasksProgressFilter);
    }
  }, [actualBoardWithTasks]);

  if (actualBoard.id == '') {
    return (
      <S.NotBoard>
        <h2>Não há quadros!</h2>
      </S.NotBoard>
    );
  }

  return (
    <S.Conteiner>
      {loading && <Loading />}
      <StatusConteiner heading="pending" tasks={tasksPending} />
      <StatusConteiner heading="progress" tasks={tasksProgress} />
      <StatusConteiner heading="concluido" tasks={tasksConcluided} />
    </S.Conteiner>
  );
};
