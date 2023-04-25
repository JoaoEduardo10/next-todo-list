import { useState } from 'react';
import * as S from './styles';
import { AiOutlineClose } from 'react-icons/ai';

export type CreateTasksProps = {
  setShowCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  rendering: boolean;
};

export const CreateTasks = ({
  setShowCreateTask,
  show,
  rendering,
}: CreateTasksProps) => {
  return (
    <S.ConteinerCreateTask show={show} rendering={rendering}>
      <S.CreateTaskForm>
        <S.Heading>
          Adicionar nova tarefa{' '}
          <span onClick={() => setShowCreateTask(false)}>
            <AiOutlineClose aria-label="Close DynamicBoard" />
          </span>
        </S.Heading>
      </S.CreateTaskForm>
    </S.ConteinerCreateTask>
  );
};
