import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Header } from '../components/header';
import { frontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  return {
    props: {},
  };
};

export default function Home() {
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
