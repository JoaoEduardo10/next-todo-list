import * as S from './styles';

import { useEffect, useState } from 'react';
import { setBoards } from '../app/features/Boards/boardSlice';
import { useAppDispatch } from '../app/hooks';
import { Header } from '../components/header';
import { TBoard } from '../types';
import { MenuDropdownModal } from '../components/menu/MenuDropdownModal';
import { Modal } from '../components/modal';

type TParamsComponents = {
  boards: TBoard[];
};

export const HomeTemplate = ({ boards }: TParamsComponents) => {
  const dispatch = useAppDispatch();
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    if (render && boards.length > 0) {
      boards.map((board) => {
        dispatch(setBoards(board));
      });
    }
  }, [render]);

  return (
    <S.Conteiner>
      <Header logo="/images/logo.svg" />
      <S.Main>
        <MenuDropdownModal show={render} />
        <Modal />
      </S.Main>
    </S.Conteiner>
  );
};
