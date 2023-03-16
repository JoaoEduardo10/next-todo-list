import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <h1>
        <span>Ola {session && JSON.stringify(session.user)}</span>
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
