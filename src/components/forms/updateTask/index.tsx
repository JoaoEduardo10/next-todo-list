import * as S from '../createTask/styles';

import { Button } from '../../button';
import { Inpult } from '../../inpult/inpult';
import { Loading } from '../../loading';
import { MessageError } from '../../messageError';
import { SubTasksInputs } from '../../subTasksInputs';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { TSubTasks, TTasks } from '@/src/types';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setNewTask } from '../../../app/features/Boards/boardSlice';
import {
  deleteActualTask,
  setActualTask,
} from '../../../app/features/tasks/tasksSlice';

import { updateCompleteTask } from '../../../utils/fecths';
import { useSession } from 'next-auth/react';
import { TSession } from '../../modal';

export type UpdateTaskProps = {
  show: boolean;
  rendering: boolean;
  setOpenFormUpdateTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateTask = ({
  rendering,
  show,
  setOpenFormUpdateTask,
}: UpdateTaskProps) => {
  const { data: Session } = useSession() as TSession;
  const dispatch = useAppDispatch();
  const actualTask = useAppSelector((store) => store.task.actualTask);
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [valueTaskName, setValueTaskName] = useState('');
  const [valueDescription, setValueDescription] = useState(
    actualTask.description ?? '',
  );
  const [subTasks, setSubTasks] = useState<TSubTasks[]>([]);
  const [clearInput] = useState(false);

  useEffect(() => {
    setValueTaskName(actualTask.text ?? '');
    setValueDescription(actualTask?.description ?? '');
  }, [actualTask, actualBoard]);

  const handleSubmitFormTask = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!valueTaskName) {
      setErrorMessage('Adicione um nome a tasks');
      setError(true);

      return;
    }

    if (valueTaskName.length < 3) {
      setErrorMessage('Adicione um nome a tasks com no minimo 3 caracteres');
      setError(true);

      return;
    }

    if (valueDescription && valueDescription.length < 6) {
      setErrorMessage('adicione no minimo 6 letras a descrição');
      setError(true);

      return;
    }

    if (subTasks.length < 1) {
      setErrorMessage('adicione no minimo 1 subTarefa');
      setError(true);

      return;
    }

    for (const task in subTasks) {
      if (!subTasks[task].text) {
        setErrorMessage(`adicone um text a subTarefa ${+task + 1}`);
        setError(true);

        return;
      }
    }

    const formTask: TTasks = {
      boardConnect: actualBoard.taskConnect,
      text: valueTaskName,
      subTasks: subTasks,
      description: valueDescription,
    };

    setLoading(true);
    const task = await updateCompleteTask(
      Session.acessToken,
      formTask,
      actualTask._id as string,
    );
    dispatch(setNewTask({ actionTask: actualTask, newTask: task }));
    setLoading(false);
  };

  const handleCloseMenu = () => {
    setOpenFormUpdateTask(false);
  };

  return (
    <S.ConteinerCreateTask
      show={show}
      rendering={rendering}
      aria-label="CreateTask Form/Conteiner"
    >
      <S.CreateTaskForm
        role="form"
        onSubmit={(event) => handleSubmitFormTask(event)}
      >
        {rendering && <MessageError error={error} text={errorMessage} />}
        {loading && <Loading />}
        <S.Heading>
          Editar tarefa{' '}
          <span onClick={handleCloseMenu}>
            <AiOutlineClose aria-label="Close CreateTask" />
          </span>
        </S.Heading>
        <S.ConteinerInput aria-label="ConteinerInput">
          <S.Label>Nome da tarefa</S.Label>
          <S.Input
            placeholder="Por exemplo: faça uma pausa para café"
            type="text"
            onChange={({ target }) => setValueTaskName(target.value)}
            value={valueTaskName}
          />
        </S.ConteinerInput>
        <S.ConteinerInput aria-label="ConteinerInput">
          <S.Label>Descrição</S.Label>
          <S.TextArea
            aria-label="Text Area"
            onChange={({ target }) => setValueDescription(target.value)}
            value={valueDescription}
          />
        </S.ConteinerInput>
        <S.ConteinerInput aria-label="ConteinerInput">
          <S.Label>SubTarefas</S.Label>
          <SubTasksInputs
            setSubTasks={setSubTasks}
            clearInput={clearInput}
            actualSubTasks={actualTask.subTasks}
          />
        </S.ConteinerInput>
        <Button>Atualizar tarefa</Button>
      </S.CreateTaskForm>
    </S.ConteinerCreateTask>
  );
};
