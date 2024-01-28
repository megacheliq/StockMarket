class CompanyInfo {
    public symbol: string;
    public description: string;
    public ceo: string;
    public city: string;
    public address: string;

    constructor (
        symbol: string,
        description: string,
        ceo: string,
        city: string,
        address: string,
    ) {
        this.symbol = symbol;
        this.description = description;
        this.ceo = ceo;
        this.city = city;
        this.address = address; 
    }
}