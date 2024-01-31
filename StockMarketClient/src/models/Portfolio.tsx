class Portfolio {
    user_id: number;
    symbol: string;
    amount: number;
    all_stock_price: number;
    last_updated: Date;

    constructor(user_id: number, symbol: string, amount: number, all_stock_price: number, last_updated: Date) {
        this.user_id = user_id;
        this.symbol = symbol;
        this.amount = amount;
        this.all_stock_price = all_stock_price;
        this.last_updated = last_updated;
    }
}