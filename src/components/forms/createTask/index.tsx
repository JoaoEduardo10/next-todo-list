import { useEffect, useState } from 'react';
import * as S from './styles';

import { AiOutlineClose } from 'react-icons/ai';
import { Inpult } from '../../inpult/inpult';
import { Button } from '../../button';
import { SubTasks } from '../../subTasks';
import { MessageError } from '../../messageError';

import { TSubTasks, TTasks } from '../../../types';
import { createTask } from '../../../utils/fecths';

import { TSession } from '../../modal';
import { useSession } from 'next-auth/react';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setTasksInBoard } from '../../../app/features/Boards/boardSlice';
import { Loading } from '../../loading';

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
  const { data: Session } = useSession() as TSession;
  const dispatch = useAppDispatch();
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const [clearInput, setClearInput] = useState(false);
  const [subTasks, setSubTasks] = useState<TSubTasks[]>([]);
  const [valueTaskName, setValueTaskName] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitFormTask = async (event: React.FormEvent) => {
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
      setErrorMessage('adicione no minimo 6 letras a description');
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
      description: valueDescription ?? '',
    };

    setLoading(true);
    const task = await createTask(Session.acessToken, formTask);
    setLoading(false);
    dispatch(setTasksInBoard(task));
    console.log(task);

    setSubTasks([]);
    setValueDescription('');
    setValueTaskName('');
    setClearInput(true);
    setShowCreateTask(false);
  };

  const handleCloseMenu = () => {
    setValueDescription('');
    setValueTaskName('');
    setSubTasks([]);
    setClearInput(true);
    setShowCreateTask(false);
  };

  useEffect(() => {
    if (error) {
      const time = setTimeout(() => {
        setError(false);
        setErrorMessage('');
      }, 4000);

      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    if (clearInput) {
      setClearInput(false);
    }
  }, [clearInput]);

  return (
    <S.ConteinerCreateTask
      show={show}
      rendering={rendering}
      aria-label="CreateTask Form/Conteiner"
    >
      <S.CreateTaskForm role="form" onSubmit={handleSubmitFormTask}>
        {rendering && <MessageError error={error} text={errorMessage} />}
        {loading && <Loading />}
        <S.Heading>
          Adicionar nova tarefa{' '}
          <span onClick={handleCloseMenu}>
            <AiOutlineClose aria-label="Close CreateTask" />
          </span>
        </S.Heading>
        <S.ConteinerInput aria-label="ConteinerInput">
          <S.Label>Nome da tarefa</S.Label>
          <Inpult
            placeholder="Por exemplo: faça uma pausa para café"
            type="text"
            onChange={setValueTaskName}
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
          <SubTasks setSubTasks={setSubTasks} clearInput={clearInput} />
        </S.ConteinerInput>
        <Button>Criar tarefa</Button>
      </S.CreateTaskForm>
    </S.ConteinerCreateTask>
  );
};
