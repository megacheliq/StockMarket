class StockYesterday {
    public status: string;
    public from: string;
    public symbol: string;
    public open: number;
    public high: number;
    public low: number;
    public close: number;
    public volume: number;
    public afterHours: number;
    public preMarket: number;
  
    constructor(
      status: string,
      from: string,
      symbol: string,
      open: number,
      high: number,
      low: number,
      close: number,
      volume: number,
      afterHours: number,
      preMarket: number
    ) {
      this.status = status;
      this.from = from;
      this.symbol = symbol;
      this.open = open;
      this.high = high;
      this.low = low;
      this.close = close;
      this.volume = volume;
      this.afterHours = afterHours;
      this.preMarket = preMarket;
    }
}