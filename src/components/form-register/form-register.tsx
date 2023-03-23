import { createUser } from '../../utils/fecths';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../button';
import * as S from '../form-login/styles';
import { Inpult } from '../inpult/inpult';
import { MessageError } from '../messageError';
import { useRouter } from 'next/router';
import { Loading } from '../loading';

export const FormRegister = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [primaryRederition, setPrimaryRederition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    let timeError: NodeJS.Timeout;

    if (error) {
      timeError = setTimeout(() => {
        setError(false);
      }, 4000);
    }

    return () => clearTimeout(timeError);
  }, [error]);

  useEffect(() => {
    let timeError: NodeJS.Timeout;

    if (!error) {
      timeError = setTimeout(() => {
        setPrimaryRederition(false);
      }, 5000);
    }

    return () => clearTimeout(timeError);
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password || !name) {
      setPrimaryRederition(true);
      setError(true);
      setMessageError('Email, name e senha são obrigatórios!');
      setLoading(false);
      return;
    }

    const response = await createUser({ email, name, password });

    if (response.ok == false) {
      setPrimaryRederition(true);
      setError(true);
      setMessageError('Email Ou senha incorretos!');
      setLoading(false);
      return;
    }

    router.push('/login');
    setLoading(false);
  };

  return (
    <S.Form role={'form'} onSubmit={handleSubmit}>
      {loading && <Loading />}
      {primaryRederition && <MessageError error={error} text={messageError} />}
      <S.Heading>Cadastro</S.Heading>
      <Inpult placeholder="Nome" type="text" onChange={setName} value={name} />
      <Inpult
        placeholder="Email"
        type="email"
        onChange={setEmail}
        value={email}
      />
      <Inpult
        placeholder="Senha"
        type="password"
        onChange={setPassword}
        value={password}
      />

      <Button disabled={loading}>Enviar</Button>
      <Link href={'/login'}>SignIn</Link>
    </S.Form>
  );
};
