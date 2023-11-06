export interface OrderbookData {
  market_id: string;
  bids: [string, string][];
  asks: [string, string][];
  sequence: number;
  timestamp: number;
}
