import { TTasks } from '../../types';
import * as S from './styles';
import { returnedSubTasksConcluded } from '../../utils/utilsFactions';

export type TaskProps = {
  tasks: TTasks[];
};

export const Task = ({ tasks }: TaskProps) => {
  return (
    <S.TasksConteiner>
      {tasks.map((task, index) => (
        <S.Tasks aria-label="Task" key={task.id + task.boardConnect + index}>
          <S.Heading>{task.text}</S.Heading>
          <S.SubText>
            <span aria-label="Subtarefas concluidas">
              {returnedSubTasksConcluded(task)}
            </span>{' '}
            para {task.subTasks && task.subTasks.length} subTarefas
          </S.SubText>
        </S.Tasks>
      ))}
    </S.TasksConteiner>
  );
};
