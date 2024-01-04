import { useEffect, useState } from 'react';
import { columns } from "../stockstable/columns";
import { DataTable } from "../stockstable/data-table";
import axiosClient from '@/axios-client';

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
            <div className="w-full">
                <h2 className="text-3xl font-bold tracking-tight ml-8">Список акций</h2>
                <div className="p-8 pb-2">
                    <DataTable columns={columns} data={data}/>  
                </div>
                          
            </div>           
        </>
    );
}

async function getData(): Promise<Stock[]> {
    try {
      const response = await axiosClient.get('/getStocks');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}