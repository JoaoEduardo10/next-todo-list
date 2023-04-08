import { ReactNode, useEffect, useState } from 'react';
import * as S from './styles';
import { useAppSelector } from '../../app/hooks';
import { Loading } from '../loading';
import { getBoardWithTasks } from '@/src/utils/fecths';
import { useSession } from 'next-auth/react';

export type ModalProps = {
  children: ReactNode;
};

export const Modal = () => {
  const actualBoard = useAppSelector((store) => store.boards.actualBoard);
  const [loading, setLoading] = useState(false);
  const { data: Session } = useSession() as any;

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      const response = await getBoardWithTasks(
        Session.acessToken,
        actualBoard.id,
      );

      console.log(response);
      setLoading(false);
    };

    request();
  }, [actualBoard]);

  return <S.Conteiner>{loading && <Loading />}</S.Conteiner>;
};
