import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../../button';
import { Inpult } from '../../inpult/inpult';
import { Loading } from '../../loading';
import { MessageError } from '../../messageError';
import * as S from './styles';

export const FormLogin = () => {
  const router = useRouter();
  const [valuePassowrd, setvaluePassowrd] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [rederition, setRederition] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeError: NodeJS.Timeout;

    // desaparecer com o erro
    if (error) {
      timeError = setTimeout(() => {
        setError(false);
      }, 4000);
    }

    return () => clearTimeout(timeError);
  }, [error]);

  useEffect(() => {
    let timeError: NodeJS.Timeout;

    // server para que o erro não aparece ao entra no site
    if (!error) {
      timeError = setTimeout(() => {
        setRederition(false);
      }, 5000);
    }

    return () => clearTimeout(timeError);
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRederition(false);
    setLoading(true);

    if (!valueEmail || !valuePassowrd) {
      setRederition(true);
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
      setRederition(true);
      setError(true);
      setMessageError('Email Ou senha incorretos!');
      setLoading(false);
      return;
    }

    const redirect = router.query?.redirect || '/';

    router.push(redirect as string);
    setLoading(false);
  };

  return (
    <S.Form role={'form'} onSubmit={handleSubmit}>
      {loading && <Loading />}
      {rederition && <MessageError error={error} text={messageError} />}
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

      <Link href={'/cadastro'}>Crie uma conta</Link>
    </S.Form>
  );
};
