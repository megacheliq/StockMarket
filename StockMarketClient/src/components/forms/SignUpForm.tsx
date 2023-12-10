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
    username: z.string({
            invalid_type_error: 'Имя пользователя должно быть строкой',
            })
            .nonempty({ message: 'Поле не должно быть пустым' })     
            .max(50, {message: 'Имя пользователя не должно быть больше 50 символов'}),
            
    email: z.string({
            invalid_type_error: 'Почта должна быть строкой',
            })
            .nonempty({ message: 'Поле не должно быть пустым' })
            .email({message: 'Неверный формат почты'})
            .max(50, {message: 'Почта не должна быть больше 50 символов'}),

    password: z.string({
            invalid_type_error: 'Пароль должен быть строкой',
            })
            .nonempty({ message: 'Поле не должно быть пустым' })
            .min(5, {message: 'Пароль не должен быть меньше 5 символов'})
            .max(50, {message: 'Пароль не должен быть больше 50 символов'}),

    passwordConfirm: z.string({
        invalid_type_error: 'Пароль должен быть строкой',
        })
        .nonempty({ message: 'Поле не должно быть пустым' })
        .min(5, {message: 'Пароль не должен быть меньше 5 символов'})
        .max(50, {message: 'Пароль не должен быть больше 50 символов'}),
})
.refine((data) => data.password === data.passwordConfirm, {
    message: "Пароли должны совпадать",
    path: ["passwordConfirm"],
});

export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
    });

    return (
        <div className='grid place-content-center'>
            <div className="flex flex-col space-y-2 text-center mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">
                Регистрация
              </h1>
              <p className="text-base text-muted-foreground">
                Заполните все поля для регистрации аккаунта
              </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-[400px]'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='Имя пользователя' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name='passwordConfirm'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='password' placeholder='Подтверждение пароля' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-[100%]'>Зарегистрироваться</Button>
                </form>
            </Form>
            <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center"> 
                    <span className="bg-background px-2 text-muted-foreground text-sm">
                        Уже есть аккаунт?
                    </span>
                </div>              
            </div>
            <Link to='/login'>
                <Button variant="outline" type="button" className='mt-4 w-[100%]'>
                    Авторизация
                </Button>
            </Link>
        </div>
    )
}

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
}