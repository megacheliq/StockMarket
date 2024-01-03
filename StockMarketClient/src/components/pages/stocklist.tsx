import { useEffect, useState } from 'react';
import { columns } from "../stockstable/columns";
import { DataTable } from "../stockstable/data-table";

interface Stock {
    symbol: string;
    name: string;
    ipo_date: string;
}

export default function StockList() {
    const [data, setData] = useState<Stock[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getData();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight">Список акций</h2>
            <DataTable columns={columns} data={data} />
        </>
    );
}

async function getData(): Promise<Stock[]> {
    return [
        {
            symbol: 'aaa',
            name: 'bbb',
            ipo_date: 'dsfs123'
        },
        {
            symbol: 'aab',
            name: 'bbb',
            ipo_date: 'dsfs123'
        },
        {
            symbol: 'aav',
            name: 'bbb',
            ipo_date: 'dsfs123'
        },
        {
            symbol: 'aac',
            name: 'bbb',
            ipo_date: 'dsfs123'
        },
        {
            symbol: 'aax',
            name: 'bbb',
            ipo_date: 'dsfs123'
        },
        {
            symbol: 'aas',
            name: 'bbb',
            ipo_date: 'dsfs123'
        },
        
    ]
}