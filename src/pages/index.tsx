import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
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
      <h1>
        <span>Ola</span>
      </h1>
      <Image
        src={'/images/bg-signIN-end-signUp.jpg'}
        alt={'bg-signIN-end-signUp'}
        width={100}
        height={100}
      />
    </>
  );
}
