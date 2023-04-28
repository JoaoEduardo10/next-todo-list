import { loginUser } from '../../../utils/fecths';
import NextAuth, { Awaitable, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareJwt } from '../../../utils/jsonWebToken';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

export interface ISessionCreate {
  acessToken: string;
}

export type TSession = {
  session: Session & ISessionCreate;
  token: JWT;
  user: User | AdapterUser;
};

export type TFunction = (parsms: TSession) => Awaitable<TSession> | null;

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
        } catch (_error: any) {
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
      const tokenExpirationInSeconds = Math.floor(24 * 60 * 60); // da 24 horas

      // usuario logado
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

      // se não tiver expiração ou se a expiração for maior que data atuação
      const time = token.expiration as unknown as number;

      if (!time) {
        return Promise.resolve({});
      }

      if (actualDateInSeconds > time) {
        return Promise.resolve({});
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (!token || !token.jwt || !session) {
        return null;
      }

      const newSession: any = { ...session };

      newSession.acessToken = token.jwt;
      newSession.user = {
        name: token.name,
      };

      return { ...newSession };
    },
  },
});
