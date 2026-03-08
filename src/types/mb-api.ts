// Raw MB API types (as returned by the exchange)
export interface MBBalance {
  symbol: string;
  available: string;
  on_hold: string;
}

export interface MBBalancesResponse {
  [symbol: string]: MBBalance;
}

export interface MBOrder {
  order_id: string;
  instrument: string;
  qty: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  status: 'active' | 'filled' | 'cancelled' | 'partially_filled';
  limit_price: string;
  avg_price: string | null;
  filled_qty: string;
  created_at: number;
  updated_at: number;
  fee: string;
}

export interface MBOrdersListResponse {
  orders: MBOrder[];
}

export interface MBTicker {
  pair: string;
  high: string;
  low: string;
  vol: string;
  last: string;
  buy: string;
  sell: string;
  open: string;
  date: number;
}
