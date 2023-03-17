import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);

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
