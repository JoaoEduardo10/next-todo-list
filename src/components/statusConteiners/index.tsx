import * as S from './styles';
import { TTasks } from '../../types';
import { Task } from '../task';
import { useEffect, useState } from 'react';

export type StatusConteinerProps = {
  heading: 'pending' | 'concluido' | 'progress';
  tasks: TTasks[];
};

export const StatusConteiner = ({ heading, tasks }: StatusConteinerProps) => {
  const [actualTask, setActualTask] = useState<TTasks[]>([]);

  useEffect(() => {
    if (tasks) {
      const actualTaskFilter = tasks.filter((task) => {
        return task.status == heading;
      });

      setActualTask(actualTaskFilter);
    }
  }, [tasks]);

  return (
    <S.Conteiner>
      <S.Heading>
        {heading} ({actualTask.length})
      </S.Heading>
      <Task tasks={actualTask} />
    </S.Conteiner>
  );
};
