import { loginUser } from '../../../utils/fecths';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
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
      console.log(token);
      return Promise.resolve(token);
    },
  },
});
