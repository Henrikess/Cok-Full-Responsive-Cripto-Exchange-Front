import { NextResponse } from 'next/server';
import { cache, CACHE_KEYS } from '@/lib/cache/memory-cache';
import type { AssetBalance } from '@/types/contracts';

const BALANCES_TTL = parseInt(process.env.CACHE_BALANCES_TTL ?? '30', 10);

export async function GET() {
  try {
    const cached = cache.get<AssetBalance[]>(CACHE_KEYS.BALANCES);
    if (cached) {
      return NextResponse.json({ data: cached, updatedAt: new Date().toISOString() });
    }

    // TODO: integrate with MB API once credentials are configured
    const assets: AssetBalance[] = [];

    cache.set(CACHE_KEYS.BALANCES, assets, BALANCES_TTL);
    return NextResponse.json({ data: assets, updatedAt: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message },
      { status: 500 }
    );
  }
}
