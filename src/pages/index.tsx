import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { TBoard } from '../types';
import { getAllBoards } from '../utils/fecths';
import { frontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setBoards } from '../app/features/Boards/boardSlice';

type TParamsComponents = {
  boards: TBoard[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session || null) {
    return serverSideRedirect(ctx);
  }

  try {
    const newSession: any = {
      ...session,
    };

    const boards = await getAllBoards(newSession.acessToken);

    return {
      props: {
        boards,
      },
    };
  } catch (error: any) {
    return {
      props: {},
    };
  }
};

export default function Home({ boards }: TParamsComponents) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const [render, setRender] = useState(false);

  if (typeof window == 'undefined' && status) return null;

  if (!session || !status) {
    return frontEndRedirect();
  }

  if (!session) {
    return <p>Voçê não está autenticado!</p>;
  }

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    if (render) {
      boards.map((board) => {
        dispatch(setBoards(board));
      });
    }
  }, [render]);

  return (
    <>
      <Header boardId="123" boardName="Board Test" logo="/images/logo.svg" />
      <div
        style={{
          backgroundColor: '#F4F7FD',
          height: '100vh',
          width: '100%',
          color: '#000',
        }}
      >
        {boards.map((item) => (
          <span key={item.id}>{item.boardName}</span>
        ))}
      </div>
    </>
  );
}
