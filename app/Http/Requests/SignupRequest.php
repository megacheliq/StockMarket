<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|max:50|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password'=> [
                'required',
                'confirmed',
                Password::min(5)
                    ->letters()
                    ->mixedCase()
                    ->numbers(),
            ],
        ];
    }

    public function messages()
    {
        return [
            'username.unique' => 'Это имя пользователя уже занято',
            'username.required' => 'Поле "Имя пользователя" обязательно для заполнения',
            'username.string' => 'Поле "Имя пользователя" должно быть строкой',
            'username.max' => 'Поле "Имя пользователя" не должно превышать 50 символов',

            'email.required' => 'Поле "Email" обязательно для заполнения',
            'email.email' => 'Поле "Email" должно быть действительным email адресом',
            'email.unique' => 'Этот email адрес уже занят',

            'password.required' => 'Поле "Пароль" обязательно для заполнения',
            'password.confirmed' => 'Подтверждение пароля не совпадает',
            'password.min' => 'Пароль должен содержать минимум 5 символов',
            'password.letters' => 'Пароль должен содержать хотя бы одну букву',
            'password.numbers' => 'Пароль должен содержать хотя бы одну цифру',
        ];
    }
}
