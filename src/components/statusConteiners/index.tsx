import * as S from './styles';
import { TTasks } from '../../types';

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
    </S.Conteiner>
  );
};
