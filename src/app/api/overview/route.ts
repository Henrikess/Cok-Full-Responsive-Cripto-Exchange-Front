import { NextResponse } from 'next/server';
import { cache, CACHE_KEYS } from '@/lib/cache/memory-cache';
import type { PortfolioOverview } from '@/types/contracts';

const BALANCES_TTL = parseInt(process.env.CACHE_BALANCES_TTL ?? '30', 10) || 30;

export async function GET() {
  try {
    const cached = cache.get<PortfolioOverview>(CACHE_KEYS.OVERVIEW);
    if (cached) {
      return NextResponse.json({ data: cached, updatedAt: new Date().toISOString() });
    }

    // TODO: integrate with MB API once credentials are configured
    // const balances = await getBalances();
    // Transform and aggregate balances into PortfolioOverview

    const overview: PortfolioOverview = {
      totalEstimatedValueBRL: '0',
      totalAssets: 0,
      assets: [],
      lastUpdatedAt: new Date().toISOString(),
    };

    cache.set(CACHE_KEYS.OVERVIEW, overview, BALANCES_TTL);
    return NextResponse.json({ data: overview, updatedAt: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message },
      { status: 500 }
    );
  }
}
