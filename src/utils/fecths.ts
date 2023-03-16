import { json } from 'stream/consumers';

export type TDataProps = {
  email: string;
  password: string;
};

const loginUser = async (data: TDataProps) => {
  const urlApi = process.env.NEXT_PUBLIC_URL_API as string;

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

export { loginUser };
