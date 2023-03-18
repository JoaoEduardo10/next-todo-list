import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '../button';
import { Inpult } from '../inpult/inpult';
import * as S from './styles';

export const FormLogin = () => {
  const router = useRouter();
  const [valuePassowrd, setvaluePassowrd] = useState('');
  const [valueEmail, setValueEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valueEmail || !valuePassowrd) {
      alert('Preencha todo os campos!');
    }

    const response = await signIn('credentials', {
      email: valueEmail,
      password: valuePassowrd,
      redirect: false,
    });

    if (!response?.ok) {
      alert('Email ou senha inválido');
    }

    const redirect = router.query?.redirect || '/';

    router.push(redirect as string);
  };

  return (
    <S.Form onSubmit={handleSubmit}>
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
