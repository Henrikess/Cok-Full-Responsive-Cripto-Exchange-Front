// API response wrapper
export interface ApiResponse<T> {
  data: T;
  updatedAt: string;
}

export interface ApiError {
  error: string;
  message: string;
  status: number;
}

// Asset/Balance
export interface AssetBalance {
  symbol: string;           // e.g. "BTC"
  name: string;             // e.g. "Bitcoin"
  totalBalance: string;     // decimal string
  availableBalance: string;
  lockedBalance: string;
  estimatedValueBRL: string;
  percentageOfPortfolio: number;
}

// Portfolio overview
export interface PortfolioOverview {
  totalEstimatedValueBRL: string;
  totalAssets: number;
  assets: AssetBalance[];
  lastUpdatedAt: string;
}

// Order status enum
export type OrderStatus = 'open' | 'executed' | 'cancelled' | 'partially_filled';
export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';

// Order
export interface Order {
  id: string;
  symbol: string;               // e.g. "BTC-BRL"
  side: OrderSide;
  type: OrderType;
  status: OrderStatus;
  quantity: string;
  price: string;
  executedQuantity: string;
  executedPrice: string | null;
  totalValue: string;
  profitLoss: string | null;        // for sell orders
  profitLossPercent: number | null;
  createdAt: string;
  updatedAt: string;
}

// Orders response
export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}

// Asset summary
export interface AssetSummary {
  symbol: string;
  recentExecutions: number;
  recentVolume: string;
  averagePrice: string;
  trendDirection: 'up' | 'down' | 'neutral';
  lastPrice: string;
}

// Bot status
export interface BotStatus {
  online: boolean;
  lastHeartbeat: string | null;
  version: string | null;
}

// Pagination params
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// Order filter params
export interface OrderFilterParams extends PaginationParams {
  symbol?: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}
