'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Input } from '@/components/ui/input'
import axiosClient from '@/axios-client'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useStateContext } from '@/contexts/ContextProvider'

interface PurchaseProps {
    previousClosure: PreviousClosure
}

const formSchema = z.object({
    amount: z.number({
        invalid_type_error: 'Количество должно быть числом',
        required_error: "Необходимо указать количество"
    })
        .positive({ message: 'Количество должно быть > 0' }),
})

export function PurchaseForm({ previousClosure }: PurchaseProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 1
        },
    });

    const [amount, setAmount] = useState(1);

    const handleDecrease = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    const handleIncrease = () => {
        if (amount < 100) {
            setAmount(amount + 1);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (inputValue === '' || isNaN(parseInt(inputValue))) {
            setAmount(1);
        } else {
            setAmount(Math.max(1, Math.min(100, parseInt(inputValue, 10))));
        }
    };

    const [errors, setErrors] = useState(null)
    const {user} = useStateContext()

    function onSubmit() {
        const payload = {
            user_email: user.email,
            symbol: previousClosure.symbol,
            amount: amount,
            single_stock_price: previousClosure.close.toFixed(2),
            stock_from: previousClosure.from
        }     

        axiosClient.post('/buyStock', payload)
            .then(({ data }) => {
                toast(data.message);
            })
            .catch(err => {
                toast('Произошла ошибка');
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    console.log(errors);
                }
        });
    }

    return (
        <div>
            <p className='font-semibold mb-2 text-lg'>Покупка акций:</p>
            <Form  {...form}>
                <div className='space-y-4 w-full'>
                    <FormField
                        control={form.control}
                        name='amount'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex justify-between gap-2'>
                                        <Button className='w-1/8 text-xl pt-1' onClick={handleDecrease}>-</Button>
                                        <Input id="amount" className='text-center align-middle' placeholder='Количество' {...field}
                                            value={amount}
                                            onChange={handleInputChange} />
                                        <Button className='w-1/8 text-xl pt-1' onClick={handleIncrease}>+</Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {errors &&
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Ошибка</AlertTitle>
                            <AlertDescription>
                                {Object.values(errors)[0] as string}
                            </AlertDescription>
                        </Alert>
                    }

                    <AlertDialog>
                        <AlertDialogTrigger className='w-full mt-3'><Button className='w-full'>${(amount * previousClosure.close).toFixed(2)}</Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Покупка {amount} акций {previousClosure.symbol} обойдется вам в ${(amount * previousClosure.close).toFixed(2)}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='w-2/4'>Нет</AlertDialogCancel>
                                <AlertDialogAction className='w-2/4'>
                                    <form onSubmit={form.handleSubmit(onSubmit)} >
                                        <Input type='hidden' value={amount} />
                                        <Button type='submit' className='w-full'>Да</Button>
                                    </form>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </Form>
        </div>
    )
}