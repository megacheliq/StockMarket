<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseRequest extends FormRequest
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
            'user_email' => 'required',
            'symbol' => 'required',
            'amount' => 'required|numeric|between:1,100',
            'single_stock_price' => 'required|numeric',
            'stock_from' => 'required|date'
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'Нужно указать uid',
            'symbol.required' => 'Нужно указать символ покупаемой акции',
            'amount.required' => 'Нужно указать количество покупаемых акций',
            'amount.between' => 'Количество должно быть от 1 до 100',
            'single_stock_price.required' => 'Нужно указать цену за одну акцию',
            'stock_from.required' => 'Нужно указать дату откуда акция'
        ];
    }
}
