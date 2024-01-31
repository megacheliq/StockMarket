import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import axiosClient from '@/axios-client';
import { useStateContext } from '@/contexts/ContextProvider'
import { LoadingSpinner } from '../loading';
import { SellForm } from '../forms/SellForm';
import { Toaster } from "@/components/ui/sonner"

export default function Portfolio() {

    const [data, setData] = useState<Portfolio[] | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);
    const { user } = useStateContext();

    const fetchData = () => {
        axiosClient.get(`/getPortfolio/${user.email}`)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            setErrorStatus(error.response.status)
          });
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="w-full">
                <Toaster />
                <h2 className="text-3xl font-bold tracking-tight ml-8">Портфель</h2>
                <div className="p-8">
                    {data || errorStatus ? (
                        <div>
                            {errorStatus == null && data != null ? (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className='text-2xl font-semibold'>Все акции</CardTitle>
                                        <CardDescription className='text-xl font-normal'>
                                            <p>
                                                Цена всего портфеля: {data.map(portfolio => parseFloat(portfolio.all_stock_price.toString())).reduce((acc, currentValue) => acc + currentValue, 0).toFixed(2)}$
                                            </p>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            {data.map((portfolioItem, index) => (
                                                <div key={index} className='mb-4'>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle className='text-xl flex justify-between'>
                                                                <div>{portfolioItem.symbol}</div>
                                                                <div className='mr-20'>Продажа акций</div>
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className='text-lg flex justify-between'>
                                                            <div>
                                                                <p><span className='font-semibold'>Всего:</span> {portfolioItem.amount} штук</p>
                                                                <p><span className='font-semibold'>Цена:</span> ${portfolioItem.all_stock_price}</p>
                                                                <p><span className='font-semibold'>Последняя сделка:</span> {portfolioItem.last_updated.toString()}</p>
                                                            </div>
                                                            <div>
                                                                <SellForm portfolio={portfolioItem} fetchData={fetchData}/>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className='font-semibold text-2xl'>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                У вас на данный момент нет акций
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className='text-9xl pb-12'>
                                            :(
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            </div>
        </>
    )
}