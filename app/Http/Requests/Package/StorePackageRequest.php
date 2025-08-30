<?php

namespace App\Http\Requests\Package;

use Illuminate\Foundation\Http\FormRequest;

class StorePackageRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'integer', 'min:0'],
            'discount' => ['nullable', 'integer', 'min:0', 'max:100'],
            'is_recommended' => ['boolean'],
            'is_active' => ['boolean'],
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
            'name.required' => 'The package name is required.',
            'name.max' => 'The package name may not be greater than 255 characters.',
            'price.required' => 'The package price is required.',
            'price.min' => 'The package price must be at least 0.',
            'discount.min' => 'The discount must be at least 0.',
            'discount.max' => 'The discount may not be greater than 100.',
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
            'name' => 'package name',
            'description' => 'package description',
            'price' => 'package price',
            'discount' => 'discount percentage',
            'is_recommended' => 'recommended status',
            'is_active' => 'active status',
        ];
    }
}
