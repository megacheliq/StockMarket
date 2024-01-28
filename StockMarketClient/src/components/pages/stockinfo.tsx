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
import { Chart } from '../chart';
import { LoadingSpinner } from '../loading';
import { PurchaseForm } from '../forms/PurchaseForm';

export default function StockInfo() {
    const { symbol } = useParams();
    const [data, setData] = useState<Stock | null>();
    const [previousClosure, setPreviousClosure] = useState<PreviousClosure | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);
    const [infoErrorStatus, setInfoErrorStatus] = useState<number | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

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

        axiosClient.get(`/previousClosure/${symbol}`)
            .then(response => {
                setPreviousClosure(response.data);
            })
            .catch(error => {
                setErrorStatus(error.response.status);
            });

        axiosClient.get(`/companyInfo/${symbol}`)
            .then(response => {
                setCompanyInfo(response.data);
            })
            .catch(error => {
                setInfoErrorStatus(error.response.status)
            });
    }, []);

    return (
        <>
            {data && (
                <div className="w-full">
                    <h2 className="text-3xl font-bold tracking-tight ml-8">{data.name}</h2>
                        <div className='p-8'>
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-2xl font-semibold'>Информация об акции</CardTitle>
                                    <CardDescription className='text-xl font-normal'>
                                        {data.symbol}
                                        {previousClosure && (
                                            <p>Торги за {previousClosure.from}</p>
                                        )}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-2'>
                                    {previousClosure || errorStatus ? (
                                        errorStatus == null && previousClosure != null ? (
                                            <div className="w-full h-80 m-auto">
                                                <Chart previousClosure={previousClosure} />
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
                                        )
                                    ) : (
                                        <LoadingSpinner />
                                    )}
                                </CardContent>
                                <CardFooter>
                                    {companyInfo || infoErrorStatus ? (
                                        infoErrorStatus == null && companyInfo != null ? (
                                            <div className='font-normal w-full h-auto flex justify-between'>
                                                <p className='w-4/6'>{companyInfo.description}</p>
                                                <div className='mr-10 text-lg w-3/12'>
                                                    <p className='font-semibold'>CEO: {companyInfo.ceo}</p>
                                                    <p className='font-semibold'>{companyInfo.city}, {companyInfo.address}</p>
                                                    {previousClosure && (
                                                        <div>
                                                            <p className='font-semibold'>Текущая цена - ${previousClosure.close}</p>
                                                            <PurchaseForm previousClosure={previousClosure} />
                                                        </div> 
                                                    )}
                                                </div>
                                            </div>
                                        )
                                            : (
                                                <div className='font-normal w-full h-auto flex justify-between'>
                                                    <p className='w-4/6'>Информация по этой компании не найдена :(</p>
                                                    <div className='mr-10 text-lg w-3/12'>
                                                        {previousClosure && (
                                                            <div>
                                                                <p className='font-semibold'>Текущая цена - ${previousClosure.close}</p>
                                                                <PurchaseForm previousClosure={previousClosure} />
                                                            </div>                                                         
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                    ) : (
                                        <LoadingSpinner />
                                    )}
                                </CardFooter>
                            </Card>
                        </div>
                </div>
            )}
        </>
    )
}