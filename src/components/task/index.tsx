import { TTasks } from '../../types';
import * as S from './styles';
import { returnedSubTasksConcluded } from '../../utils/utilsFactions';
import { TasksModal } from '../taskModal';
import { useEffect, useState } from 'react';

export type TaskProps = {
  tasks: TTasks[];
};

const test: TTasks = {
  text: 'test',
  boardConnect: '123',
  description: 'amigo',
  subTasks: [
    {
      text: 'amigo',
    },
  ],
};

export const Task = ({ tasks }: TaskProps) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [getTask, setGetTask] = useState<any>();

  useEffect(() => {
    const time = setTimeout(() => {
      setRendering(true);
    }, 500);

    return () => clearTimeout(time);
  }, []);

  const handleShowTaskModalClisk = (task: TTasks) => {
    setShowTaskModal(true);
    setGetTask(task);
  };

  return (
    <S.TasksConteiner>
      <TasksModal
        show={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        actualTasks={getTask}
        rendering={rendering}
      />
      {tasks.map((task, index) => (
        <S.Tasks
          aria-label="Task"
          key={task.id + task.boardConnect + index}
          onClick={() => handleShowTaskModalClisk(task)}
        >
          <S.Heading>{task.text}</S.Heading>
          <S.SubText>
            <span aria-label="Subtarefas concluidas">
              {returnedSubTasksConcluded(task.subTasks ?? [])}
            </span>{' '}
            para {task.subTasks && task.subTasks.length} subTarefas
          </S.SubText>
        </S.Tasks>
      ))}
    </S.TasksConteiner>
  );
};
