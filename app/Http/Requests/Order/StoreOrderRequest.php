<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // You can add authorization logic here
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'package_id' => ['required', 'integer', 'exists:packages,id'],
            'wedding_id' => ['required', 'integer', 'exists:weddings,id'],
            'invoice_number' => ['nullable', 'string', 'max:255', 'unique:orders'],
            'total_price' => ['required', 'integer', 'min:0'],
            'unique_price' => ['required', 'integer', 'min:0'],
            'payment_type' => ['nullable', 'string', 'max:255'],
            'payment_url' => ['nullable', 'string', 'max:500'],
            'external_transaction_id' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'The user ID is required.',
            'user_id.exists' => 'The selected user does not exist.',
            'package_id.required' => 'The package ID is required.',
            'package_id.exists' => 'The selected package does not exist.',
            'wedding_id.required' => 'The wedding ID is required.',
            'wedding_id.exists' => 'The selected wedding does not exist.',
            'total_price.required' => 'The total price is required.',
            'total_price.min' => 'The total price must be at least 0.',
            'unique_price.required' => 'The unique price is required.',
            'unique_price.min' => 'The unique price must be at least 0.',
            'invoice_number.unique' => 'This invoice number is already taken.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'user_id' => 'user',
            'package_id' => 'package',
            'wedding_id' => 'wedding',
            'invoice_number' => 'invoice number',
            'total_price' => 'total price',
            'unique_price' => 'unique price',
            'payment_type' => 'payment type',
            'payment_url' => 'payment URL',
            'external_transaction_id' => 'external transaction ID',
            'status' => 'order status',
        ];
    }
}
