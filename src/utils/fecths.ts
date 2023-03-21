import { json } from 'stream/consumers';

export type TDataProps = {
  email: string;
  password: string;
};
interface IUser {
  name: string;
  email: string;
  password: string;
}
const urlApi = process.env.NEXT_PUBLIC_URL_API as string;

const loginUser = async (data: TDataProps) => {
  const response = await fetch(`${urlApi}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const token = await response.json();

  return token;
};

const createUser = async (user: IUser) => {
  const { email, name, password } = user;

  const response = await fetch(`${urlApi}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  return {
    ok: response.ok,
  };
};

export { loginUser, createUser };
