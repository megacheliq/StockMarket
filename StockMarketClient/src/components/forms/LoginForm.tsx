'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
    email: z.string({
            required_error: 'Это поле обязательное',
            invalid_type_error: 'Почта должна быть строкой',
            })
            .email({message: 'Неверный формат почты'})
            .max(50, {message: 'Почта не может быть > 50 символов'}),
    password: z.string({
            required_error: 'Это поле обязательное',
            invalid_type_error: 'Пароль должен быть строкой',
            })
            .min(5, {message: 'Пароль не может быть меньше 5 символов'})
            .max(50, {message: 'Пароль не может быть больше 50 символов'}),
})

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <div className='h-[100vh] grid place-content-center'>
            <Card className='w-[400px] mx-auto'>
                <CardHeader>
                    <CardTitle>Вход в аккаунт</CardTitle>
                    <CardDescription>С возвращением!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Почта</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Почта' {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Пароль</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Пароль' {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-[100%]'>Войти</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
}