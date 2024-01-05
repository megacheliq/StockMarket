class Stock {
    public id: number | null;
    public symbol: string;
    public name: string;
    public exchange: string | null;
    public asset_type: string | null;
    public ipo_date: string;
    public delisting_date: string | null;
    public status: string | null;

    constructor(
        symbol: string,
        name: string,
        ipo_date: string,
        id?: number | null,
        exchange?: string | null,
        asset_type?: string | null,
        delisting_date?: string | null,
        status?: string | null
    ) {
        this.id = id !== undefined ? id : null;
        this.symbol = symbol;
        this.name = name;
        this.ipo_date = ipo_date;
        this.exchange = exchange !== undefined ? exchange : null;
        this.asset_type = asset_type !== undefined ? asset_type : null;
        this.delisting_date = delisting_date !== undefined ? delisting_date : null;
        this.status = status !== undefined ? status : null;
    }
}