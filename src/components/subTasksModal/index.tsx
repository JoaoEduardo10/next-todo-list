import { useEffect, useState } from 'react';
import * as S from './styles';
import { TSubTasks } from '@/src/types';

export type SubTasksModalProps = {
  subTasks: TSubTasks[];
};

export const SubTasksModal = ({ subTasks }: SubTasksModalProps) => {
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
      <S.Heading role="heading">SubTasks</S.Heading>
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
