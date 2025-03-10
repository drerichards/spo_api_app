// utils/createCookie.ts
import { serialize } from 'cookie';

export const createCookie = (name: string, value: string, maxAge: number, httpOnly: boolean = true) => {
  return serialize(name, value, {
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
};