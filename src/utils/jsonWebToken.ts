import jwt from 'jsonwebtoken';

export interface Ijwt {
  email: string;
  name: string;
  id: string | number;
}

export interface IjwtComplete {
  iat: number;
  exp: number;
}

export const compareJwt = (token: string): (Ijwt & IjwtComplete) | null => {
  try {
    const jwtHash = process.env.NEXT_PUBLIC_HASH_JWT as string;

    const varifyToken = jwt.verify(token, jwtHash);

    return varifyToken as Ijwt & IjwtComplete;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
