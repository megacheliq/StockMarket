'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
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
        <div className='grid place-content-center'>
            <div className="flex flex-col space-y-2 text-center mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">
                Вход в аккаунт
              </h1>
              <p className="text-base text-muted-foreground">
                Введите вашу почту и пароль для авторизации
              </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-[400px]'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
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
            <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground text-sm">
                        Нет аккаунта?
                    </span>
                </div>              
            </div>
            <Link to='/signup'>
                <Button variant="outline" type="button" className='mt-4 w-[100%]'>
                    Регистрация
                </Button>
            </Link>
        </div>
    )
}

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
}