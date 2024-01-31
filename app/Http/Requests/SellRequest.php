<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SellRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'single_stock_price' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'Нужно указать uid',
            'symbol.required' => 'Нужно указать символ продаваемой акции',
            'amount.required' => 'Нужно указать количество продаваемых акций',
            'total_amount.required' => 'Нужно указать количество продаваемых акций',
            'single_stock_price.required' => 'Нужно указать цену за одну акцию',
        ];
    }
}
