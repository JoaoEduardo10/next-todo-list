import * as S from './styles';
import { TTasks } from '../../types';
import { Task } from '../task';

export type StatusConteinerProps = {
  heading: 'pending' | 'concluido' | 'progress';
  tasks: TTasks[];
};

export const StatusConteiner = ({ heading, tasks }: StatusConteinerProps) => {
  return (
    <S.Conteiner>
      <S.Heading>
        {heading} ({tasks.length})
      </S.Heading>
      <Task tasks={tasks} />
    </S.Conteiner>
  );
};
