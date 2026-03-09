import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE_NAME = 'mb_session';
const SESSION_DURATION = '8h';

function getAuthConfig() {
  const password = process.env.AUTH_PASSWORD;
  const secretRaw = process.env.AUTH_SECRET;

  if (!password) {
    throw new Error('AUTH_PASSWORD environment variable is required and must not be empty.');
  }
  if (!secretRaw || secretRaw.length < 32) {
    throw new Error('AUTH_SECRET environment variable is required and must be at least 32 characters.');
  }

  return {
    username: process.env.AUTH_USERNAME ?? 'admin',
    password,
    secret: new TextEncoder().encode(secretRaw),
  };
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  const config = getAuthConfig();
  return username === config.username && password === config.password;
}

export async function createSessionToken(): Promise<string> {
  const config = getAuthConfig();
  return new SignJWT({ role: 'user' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(config.secret);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const config = getAuthConfig();
    await jwtVerify(token, config.secret);
    return true;
  } catch {
    return false;
  }
}
