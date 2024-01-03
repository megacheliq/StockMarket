class Stock {
    public symbol: string;
    public name: string;
    public ipo_date: string;

    constructor(
        symbol: string,
        name: string,
        ipo_date: string,
    ) {
        this.symbol = symbol;
        this.name = name;
        this.ipo_date = ipo_date;
    }
}