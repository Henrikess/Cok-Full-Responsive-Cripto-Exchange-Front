import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'BAD_REQUEST', message: 'Usuário e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const valid = await validateCredentials(username, password);
    if (!valid) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED', message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
