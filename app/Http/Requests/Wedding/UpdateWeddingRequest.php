<?php

namespace App\Http\Requests\Wedding;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWeddingRequest extends FormRequest
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
        $weddingId = $this->route('wedding') ?? $this->route('id');
        
        return [
            'theme_id' => ['sometimes', 'nullable', 'integer', 'exists:themes,id'],
            'user_id' => ['sometimes', 'integer', 'exists:users,id'],
            'wedding_start' => ['sometimes', 'nullable', 'date'],
            'wedding_end' => ['sometimes', 'nullable', 'date', 'after:wedding_start'],
            'is_active' => ['sometimes', 'boolean'],
            'is_draft' => ['sometimes', 'boolean'],
            'is_published' => ['sometimes', 'boolean'],
            'slug' => [
                'sometimes', 
                'nullable', 
                'string', 
                'max:255', 
                Rule::unique('weddings')->ignore($weddingId)
            ],
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
            'user_id.exists' => 'The selected user does not exist.',
            'theme_id.exists' => 'The selected theme does not exist.',
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
