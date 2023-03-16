import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>Ola</h1>
      <Image
        src={'/images/bg-signIN-end-signUp.jpg'}
        alt={'bg-signIN-end-signUp'}
        width={100}
        height={100}
      />
    </>
  );
}
