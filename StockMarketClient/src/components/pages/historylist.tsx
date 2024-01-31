import { useEffect, useState } from 'react';
import axiosClient from '@/axios-client';
import { operationColumns } from '../stockstable/operationcolumns';
import { useStateContext } from '@/contexts/ContextProvider'
import { DataTable } from '../stockstable/data-table';

interface Operation {
    operation_type: string,
    stock_symbol: string,
    amount: number,
    total_price: string,
    date: string,
}

export default function HistoryList () {
    const [data, setData] = useState<Operation[]>([]);
    const { user } = useStateContext();
    
    const fetchData = () => {
        axiosClient.get(`/getOperations/${user.email}`)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error(error);
        });
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="w-full">
                <h2 className="text-3xl font-bold tracking-tight ml-8">Список операций</h2>
                <div className="p-8 pb-2">
                    <DataTable columns={operationColumns} data={data} />
                </div>
            </div>
        </>
    );
}

