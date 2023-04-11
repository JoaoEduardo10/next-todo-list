import * as S from './styles';
import { TTasks } from '../../types';
import { Task } from '../task';
import { useEffect, useState } from 'react';

export type StatusConteinerProps = {
  heading: 'pending' | 'concluded' | 'progress';
  tasks?: TTasks[];
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
  }, [tasks, heading]);

  return (
    <S.Conteiner aria-label="Conteiners Tasks">
      <S.Heading aria-label="Status">
        {heading} ({actualTask && actualTask.length})
      </S.Heading>
      <Task tasks={actualTask} />
    </S.Conteiner>
  );
};
