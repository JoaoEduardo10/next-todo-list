import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Header } from '../components/header';
import { TBoard } from '../types';
import { getAllBoards, getBoard } from '../utils/fecths';
import { frontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';

type TParamsComponents = {
  boards: TBoard[];
};

export default function Home({ boards }: TParamsComponents) {
  const { data: session, status } = useSession();

  if (!session || !status) {
    return frontEndRedirect();
  }

  if (typeof window == 'undefined' && status) return null;

  if (!session) {
    return <p>Voçê não está autenticado!</p>;
  }

  return (
    <>
      <Header boardId="123" boardName="Board Test" logo="/images/logo.svg" />
      <div
        style={{
          backgroundColor: '#F4F7FD',
          height: '100vh',
          width: '100%',
        }}
      ></div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
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
