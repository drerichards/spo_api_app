import { serialize } from 'cookie';

/**
 * Generates a serialized HTTP-only cookie string.
 * @param name - Name of the cookie (e.g., 'spotify_access_token')
 * @param value - Token value
 * @param maxAge - Expiration time in seconds
 * @returns Serialized cookie string
 */
export const createCookie = (name: string, value: string, maxAge: number) => {
  return serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
};
