import { useEffect, useState } from 'react';
import * as S from './styles';
import { TSubTasks } from '@/src/types';
import { returnedSubTasksConcluded } from '@/src/utils/utilsFactions';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setNewSubTaskConcluded } from '../../app/features/Boards/boardSlice';

export type SubTasksModalProps = {
  subTasks: TSubTasks[];
};

export const SubTasksModal = ({ subTasks }: SubTasksModalProps) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((store) => store.task.actualTask);
  const [subTaskCheckBox, setSubTaskCheckBox] = useState<TSubTasks[]>([]);

  useEffect(() => {
    setSubTaskCheckBox([...subTasks]);
  }, [subTasks]);

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { checked } = event.target;

    const newSubTasks: TSubTasks[] = subTaskCheckBox.map((subTask, i) => {
      if (i === index) {
        dispatch(
          setNewSubTaskConcluded({
            uuid: subTask.uuid as string,
            concluded: checked,
            task,
          }),
        );

        return {
          ...subTask,
          concluded: checked,
        };
      }
      return subTask;
    });

    setSubTaskCheckBox(newSubTasks);
  };

  return (
    <S.Conteiner>
      <S.Heading role="heading">
        SubTasks ({returnedSubTasksConcluded(subTaskCheckBox)} de{' '}
        {subTaskCheckBox.length})
      </S.Heading>
      {subTaskCheckBox.map((subTask, index) => (
        <S.ConteinerInput key={subTask.uuid + subTask.text} role="listbox">
          <S.Input
            name={subTask.text}
            type="checkbox"
            onChange={(event) => handleChangeInput(event, index)}
            checked={subTask.concluded}
          />
          <S.Label aria-label="SubtaskName">{subTask.text}</S.Label>
        </S.ConteinerInput>
      ))}
    </S.Conteiner>
  );
};
