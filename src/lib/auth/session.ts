import { SignJWT, jwtVerify } from 'jose';

const AUTH_USERNAME = process.env.AUTH_USERNAME ?? 'admin';
const AUTH_PASSWORD = process.env.AUTH_PASSWORD ?? '';
const AUTH_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? 'fallback-secret-change-in-production-32chars'
);
const SESSION_DURATION = '8h';
export const SESSION_COOKIE_NAME = 'mb_session';

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  return username === AUTH_USERNAME && password === AUTH_PASSWORD;
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: 'user' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(AUTH_SECRET);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, AUTH_SECRET);
    return true;
  } catch {
    return false;
  }
}
