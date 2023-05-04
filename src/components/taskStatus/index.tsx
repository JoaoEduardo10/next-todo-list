import { useEffect, useState } from 'react';
import * as S from './styles';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setNewStatus } from '../../app/features/Boards/boardSlice';
import { useSession } from 'next-auth/react';
import { TSession } from '../modal';
import { updateStatus } from '../../utils/fecths';

export type TaskStatusProps = {
  status: 'pending' | 'progress' | 'concluded';
};

export const TaskStatus = ({ status }: TaskStatusProps) => {
  const { data: Session } = useSession() as TSession;
  const dispatch = useAppDispatch();
  const task = useAppSelector((store) => store.task.actualTask);
  const [valueStatus, setValueStatus] =
    useState<TaskStatusProps['status']>('pending');
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    setValueStatus(status);
  }, [status]);

  useEffect(() => {
    if (Session) {
      const time = setTimeout(async () => {
        await updateStatus(
          Session.acessToken,
          valueStatus,
          task._id as TaskStatusProps['status'],
        );
      }, 2000);

      return () => clearTimeout(time);
    }
  }, [status, valueStatus]);

  const handleChangeValueSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as TaskStatusProps['status'];

    if (rendered) {
      setValueStatus(value);
      dispatch(setNewStatus({ status: value, task }));
    }
  };

  return (
    <S.Conteiner>
      <S.Heading>Status atual</S.Heading>
      <S.Select value={valueStatus} onChange={handleChangeValueSelect}>
        <S.Option value="concluded">Concluido</S.Option>
        <S.Option value="pending">Pendente</S.Option>
        <S.Option value="progress">Em progresso</S.Option>
      </S.Select>
    </S.Conteiner>
  );
};
