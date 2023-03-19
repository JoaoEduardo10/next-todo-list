import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Button } from '../button';
import { Inpult } from '../inpult/inpult';
import { MessageError } from '../messageError';
import * as S from './styles';

export const FormLogin = () => {
  const router = useRouter();
  const [valuePassowrd, setvaluePassowrd] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [primaryRederition, setPrimaryRederition] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (!valueEmail || !valuePassowrd) {
      setPrimaryRederition(true);
      setError(true);
      setMessageError('Email e senha são obrigatórios!');
      setLoading(false);
      return;
    }

    const response = await signIn('credentials', {
      email: valueEmail,
      password: valuePassowrd,
      redirect: false,
    });

    if (!response?.ok) {
      setPrimaryRederition(true);
      setError(true);
      setMessageError('Email Ou senha incorretos!');
      setLoading(false);
      return;
    }

    router.push('/');
    setLoading(false);
  };

  return (
    <S.Form role={'form'} onSubmit={handleSubmit}>
      {primaryRederition && <MessageError error={error} text={messageError} />}
      <S.Heading>Login User</S.Heading>

      <Inpult
        placeholder="Email"
        type="email"
        onChange={setValueEmail}
        value={valueEmail}
      />
      <Inpult
        placeholder="Senha"
        type="password"
        onChange={setvaluePassowrd}
        value={valuePassowrd}
      />

      <Button disabled={loading}>Entrar</Button>
    </S.Form>
  );
};
