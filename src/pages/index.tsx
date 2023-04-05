import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { TBoard } from '../types';
import { getAllBoards } from '../utils/fecths';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { HomeTemplate } from '../templates/Home';

type TParamsComponents = {
  boards: TBoard[];
};

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

export default function Home({ boards }: TParamsComponents) {
  return <HomeTemplate boards={boards} />;
}
