import { serialize } from 'cookie';

export const createCookie = (name: string, value: string, maxAge: number) => {
  return serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensures secure cookies in prod
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
};
