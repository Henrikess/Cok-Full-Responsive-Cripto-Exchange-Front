import { NextRequest, NextResponse } from 'next/server';
import { cache, CACHE_KEYS } from '@/lib/cache/memory-cache';
import type { OrdersResponse } from '@/types/contracts';

const ORDERS_TTL = parseInt(process.env.CACHE_ORDERS_TTL ?? '20', 10);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') ?? '20', 10);
  const symbol = searchParams.get('symbol') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const cacheKey = `${CACHE_KEYS.ORDERS}:${symbol ?? 'all'}:${status ?? 'all'}:${page}`;
  const cached = cache.get<OrdersResponse>(cacheKey);
  if (cached) {
    return NextResponse.json({ data: cached, updatedAt: new Date().toISOString() });
  }

  try {
    // TODO: integrate with MB API once credentials are configured
    const ordersResponse: OrdersResponse = {
      orders: [],
      total: 0,
      page,
      pageSize,
    };

    cache.set(cacheKey, ordersResponse, ORDERS_TTL);
    return NextResponse.json({ data: ordersResponse, updatedAt: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message },
      { status: 500 }
    );
  }
}
