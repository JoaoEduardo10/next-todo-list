import { useEffect, useState } from 'react';
import { setBoards } from '../app/features/Boards/boardSlice';
import { useAppDispatch } from '../app/hooks';
import { Header } from '../components/header';
import { TBoard } from '../types';

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
    <>
      <Header logo="/images/logo.svg" />
      <div
        style={{
          backgroundColor: '#F4F7FD',
          height: '100vh',
          width: '100%',
          color: '#000',
        }}
      >
        {boards.length > 0 &&
          boards.map((item) => <span key={item.id}>{item.boardName}</span>)}
      </div>
    </>
  );
};
