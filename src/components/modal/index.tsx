import { ReactNode, useEffect, useState } from 'react';
import * as S from './styles';

import { Loading } from '../loading';
import { getBoardWithTasks } from '../../utils/fecths';

import { useSession } from 'next-auth/react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setActualBoardWithTasks } from '../../app/features/Boards/boardSlice';
import { StatusConteiner } from '../statusConteiners';

export type ModalProps = {
  children: ReactNode;
};

export const Modal = () => {
  const dispatch = useAppDispatch();
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const actualBoardWithTasks = useAppSelector(
    (store) => store.boards.actualBoardWithTasks,
  );
  const [loading, setLoading] = useState(false);
  const { data: Session } = useSession() as any;

  useEffect(() => {
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
  }, [actualBoard]);

  const tasksConcluded = actualBoardWithTasks.tasks.filter((task) => {
    return task.status == 'concluded';
  });
  const tasksPending = actualBoardWithTasks.tasks.filter((task) => {
    return task.status == 'pending';
  });
  const tasksprogress = actualBoardWithTasks.tasks.filter((task) => {
    return task.status == 'progress';
  });

  return (
    <S.Conteiner>
      {loading && <Loading />}
      <StatusConteiner heading="concluido" tasks={tasksConcluded} />
      <StatusConteiner heading="pending" tasks={tasksPending} />
      <StatusConteiner heading="progress" tasks={tasksprogress} />
    </S.Conteiner>
  );
};
