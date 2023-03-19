import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    let timeError: NodeJS.Timeout;

    if (error) {
      timeError = setTimeout(() => {
        setError(false);
      }, 4000);
    }

    return () => clearTimeout(timeError);
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valueEmail || !valuePassowrd) {
      setError(true);
      setMessageError('Email e senha são obrigatórios!');
      return;
    }

    const response = await signIn('credentials', {
      email: valueEmail,
      password: valuePassowrd,
      redirect: false,
    });

    if (!response?.ok) {
      setError(true);
      setMessageError('Email Ou senha incorretos!');
      return;
    }

    router.push('/');
  };

  return (
    <S.Form role={'form'} onSubmit={handleSubmit}>
      <MessageError error={error} text={messageError} />
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

      <Button>Entrar</Button>
    </S.Form>
  );
};
