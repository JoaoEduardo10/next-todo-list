import { useEffect, useState } from 'react';
import * as S from './styles';

export type TaskStatusProprs = {
  status: 'pending' | 'progress' | 'concluded';
};

export const TaskStatus = ({ status }: TaskStatusProprs) => {
  const [valueStatus, setValueStatus] = useState<typeof status>('pending');

  useEffect(() => {
    setValueStatus(status);
  }, [status]);

  const handleChangeValueSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as typeof status;

    setValueStatus(value);
  };

  return (
    <S.Conteiner>
      <S.Heading>Status atual</S.Heading>
      <S.Select value={valueStatus} onChange={handleChangeValueSelect}>
        <S.Option value="concluded">Concluido</S.Option>
        <S.Option value="pending">Pendente</S.Option>
        <S.Option value="progress">Em progresso</S.Option>
      </S.Select>
    </S.Conteiner>
  );
};
