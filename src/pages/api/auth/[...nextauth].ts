import { loginUser } from '../../../utils/fecths';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareJwt } from '../../../utils/jsonWebToken';
import { match } from 'assert';

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(Credentials) {
        try {
          const { email, password } = Credentials!;

          const token = await loginUser({ email, password });

          const errors = {
            email: 'Email invalido!',
            password: 'Senha invalida!',
          };

          if (token.error == errors.email) {
            throw new Error('Usuário não existe! Email invalido');
          }

          if (token.error == errors.password) {
            throw new Error('Senha errada!');
          }

          return token;
        } catch (error: any) {
          console.error(error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const jwtHash = compareJwt(user as unknown as string);
      const isSignIN = !!jwtHash;
      const actualDateInSeconds = Math.floor(Date.now() / 1000); // data atual em segundos
      const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60); // da 7 dias

      if (isSignIN) {
        if (!user) {
          return Promise.resolve({});
        }

        token.name = jwtHash.name;
        token.jwt = user;
        token.expiration = Math.floor(
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      }

      if (!token.expiration || token.expiration > actualDateInSeconds) {
        return Promise.resolve({});
      }

      return Promise.resolve(token);
    },
  },
});
