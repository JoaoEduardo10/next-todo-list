import { TTasks } from '@/src/types';
import * as S from './styles';
import { returnedSubTasksConcluded } from '@/src/utils/utilsFactions';

export type TaskProps = {
  tasks: TTasks[];
};

export const Task = ({ tasks }: TaskProps) => {
  return (
    <S.TasksConteiner>
      {tasks.map((task) => (
        <S.Tasks key={task.id + task.boardConnect}>
          <S.Heading>{task.text}</S.Heading>
          <S.SubText>
            {returnedSubTasksConcluded(task)} para {task.subTasks.length}{' '}
            subTarefas
          </S.SubText>
        </S.Tasks>
      ))}
    </S.TasksConteiner>
  );
};
