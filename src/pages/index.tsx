import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { TBoard } from '../types';
import { getAllBoards } from '../utils/fecths';
import { frontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { HomeTemplate } from '../templates/Home';

type TParamsComponents = {
  boards: TBoard[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session == (null || undefined)) {
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

  if (typeof window == 'undefined' && status) return null;

  if (!session || !status) {
    return frontEndRedirect();
  }

  if (!session) {
    return <p>Voçê não está autenticado!</p>;
  }

  return <HomeTemplate boards={boards} />;
}
