import crypto from 'crypto';
import type { MBBalancesResponse, MBOrdersListResponse, MBTicker } from '@/types/mb-api';

const MB_API_BASE_URL = process.env.MB_API_BASE_URL ?? 'https://api.mercadobitcoin.net/api/v4';
const MB_API_KEY = process.env.MB_API_KEY ?? '';
const MB_API_SECRET = process.env.MB_API_SECRET ?? '';

function buildAuthHeaders(method: string, path: string, body: string = ''): Record<string, string> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const dataToSign = `${MB_API_KEY}\n${timestamp}\n${nonce}\n${method}\n${path}\n${body}`;
  const signature = crypto
    .createHmac('sha256', MB_API_SECRET)
    .update(dataToSign)
    .digest('hex');

  return {
    'MBANKINGAPI-MSG-SIGNATURE': signature,
    'MBANKINGAPI-TIMESTAMP': timestamp,
    'MBANKINGAPI-NONCE': nonce,
    'MBANKINGAPI-ACCESS-KEY': MB_API_KEY,
    'Content-Type': 'application/json',
  };
}

async function mbFetch<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const bodyStr = body ? JSON.stringify(body) : '';
  const headers = buildAuthHeaders(method, path, bodyStr);
  const response = await fetch(`${MB_API_BASE_URL}${path}`, {
    method,
    headers,
    body: bodyStr || undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`MB API error ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
}

export async function getBalances(): Promise<MBBalancesResponse> {
  return mbFetch<MBBalancesResponse>('/accounts/balances');
}

export async function getOpenOrders(symbol?: string): Promise<MBOrdersListResponse> {
  const path = symbol ? `/orders?instrument=${symbol}&status=active` : '/orders?status=active';
  return mbFetch<MBOrdersListResponse>(path);
}

export async function getFilledOrders(symbol?: string, page = 1, pageSize = 20): Promise<MBOrdersListResponse> {
  const base = `/orders?status=filled&page=${page}&page_size=${pageSize}`;
  const path = symbol ? `${base}&instrument=${symbol}` : base;
  return mbFetch<MBOrdersListResponse>(path);
}

export async function getTicker(symbol: string): Promise<MBTicker> {
  return mbFetch<MBTicker>(`/${symbol}/ticker`);
}
