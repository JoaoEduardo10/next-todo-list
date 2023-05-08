import { useEffect, useState } from 'react';
import * as S from './styles';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setNewStatus } from '../../app/features/Boards/boardSlice';
import { useSession } from 'next-auth/react';
import { TSession } from '../modal';
import { updateStatus } from '../../utils/fecths';

export type TaskStatusProps = {
  status: 'pending' | 'progress' | 'concluded';
  update: boolean;
  rendered: boolean;
};

export const TaskStatus = ({ status, update, rendered }: TaskStatusProps) => {
  const { data: Session } = useSession() as TSession;
  const dispatch = useAppDispatch();
  const task = useAppSelector((store) => store.task.actualTask);
  const [valueStatus, setValueStatus] =
    useState<TaskStatusProps['status']>('pending');

  useEffect(() => {
    setValueStatus(status);
  }, [status]);

  useEffect(() => {
    if (!Session) return;

    if (!update && rendered && task._id) {
      dispatch(setNewStatus({ status: valueStatus, task }));
      const handleUpdateStatus = async () => {
        await updateStatus(Session.acessToken, valueStatus, task._id as string);
      };

      handleUpdateStatus();
    }
  }, [valueStatus, update]);

  const handleChangeValueSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as TaskStatusProps['status'];

    setValueStatus(value);
  };

  return (
    <S.Conteiner>
      <S.Heading>Status atual</S.Heading>
      <S.Select
        role="combobox"
        value={valueStatus}
        onChange={handleChangeValueSelect}
      >
        <S.Option role="option" value="concluded">
          Concluido
        </S.Option>
        <S.Option role="option" value="pending">
          Pendente
        </S.Option>
        <S.Option role="option" value="progress">
          Em progresso
        </S.Option>
      </S.Select>
    </S.Conteiner>
  );
};
