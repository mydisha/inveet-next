<?php

namespace App\Http\Requests\Wedding;

use Illuminate\Foundation\Http\FormRequest;

class StoreWeddingRequest extends FormRequest
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
            'theme_id' => ['nullable', 'integer', 'exists:themes,id'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'wedding_start' => ['nullable', 'date', 'after:now'],
            'wedding_end' => ['nullable', 'date', 'after:wedding_start'],
            'is_active' => ['boolean'],
            'is_draft' => ['boolean'],
            'is_published' => ['boolean'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:weddings'],
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
            'theme_id.exists' => 'The selected theme does not exist.',
            'wedding_start.after' => 'The wedding start date must be in the future.',
            'wedding_end.after' => 'The wedding end date must be after the start date.',
            'slug.unique' => 'This slug is already taken.',
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
            'theme_id' => 'theme',
            'user_id' => 'user',
            'wedding_start' => 'wedding start date',
            'wedding_end' => 'wedding end date',
            'slug' => 'URL slug',
        ];
    }
}
