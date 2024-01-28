'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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

interface PurchaseProps {
    previousClosure: PreviousClosure
}

const formSchema = z.object({
    amount: z.number({
        invalid_type_error: 'Количество должно быть числом',
    }),
})

export function PurchaseForm({ previousClosure }: PurchaseProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 1
        },
    });

    const [errors, setErrors] = useState(null)
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            amount: values.amount
        }

        axiosClient.post('', payload)
            .then(({data}) => {

            })
            .catch(err => {
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
                    <FormField
                        control={form.control}
                        name='amount'
                        render={({ field }) => (                           
                            <FormItem>
                                <FormControl>                                   
                                    <Input id="amount" type='number' placeholder='Количество' {...field} />
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

                    <Button type='submit' className='w-[100%]'>Купить</Button>
                </form>
            </Form>
        </div>
    )
}