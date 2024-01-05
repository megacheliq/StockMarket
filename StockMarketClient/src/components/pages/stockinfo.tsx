import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '@/axios-client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function StockInfo() {
    const { symbol } = useParams();
    const [data, setData] = useState<Stock | null>();
    const [yesterdayData, setYesterdayData] = useState<StockYesterday | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    useEffect(() => {
        async function getData(): Promise<Stock> {
            try {
                const response = await axiosClient.get(`/stockInfo/${symbol}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }

        async function fetchData() {
            try {
                const result = await getData();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();

        axiosClient.get(`/stockYesterdayInfo/${symbol}`)
            .then(response => {
                setYesterdayData(response.data);
            })
            .catch(error => {
                setErrorStatus(error.response.status);
            });
    }, []);

    return (
        <>
            {data && (
                <div className="w-full">
                    <h2 className="text-3xl font-bold tracking-tight ml-8">{data.name}</h2>
                    <Tabs defaultValue='info' className='p-8'>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value='info'>Информация</TabsTrigger>
                            <TabsTrigger value='purchase'>Покупка</TabsTrigger>
                        </TabsList>
                        <TabsContent value='info'>
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-2xl font-semibold'>Информация об акции</CardTitle>
                                    <CardDescription className='text-xl font-normal'>{data.symbol}</CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-2'>
                                    {yesterdayData ? (
                                        <div>
                                            some data...
                                        </div>
                                    ) : (
                                        errorStatus === 404 ? (
                                            <div>
                                                Ничего не найдено
                                            </div>
                                        ) : (
                                            errorStatus === 429 && (
                                                <div>
                                                    Слишком много запросов
                                                </div>
                                            )
                                        )
                                    )}

                                </CardContent>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </>
    )
}