<?php

namespace App\Http\Requests\SpecialInvitation;

use Illuminate\Foundation\Http\FormRequest;

class StoreSpecialInvitationRequest extends FormRequest
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
            'wedding_id' => ['nullable', 'integer', 'exists:weddings,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:special_invitations'],
            'is_active' => ['boolean'],
            'is_locked' => ['boolean'],
            'password' => ['nullable', 'string', 'min:6', 'max:255'],
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
            'name.required' => 'The invitation name is required.',
            'name.max' => 'The invitation name may not be greater than 255 characters.',
            'wedding_id.exists' => 'The selected wedding does not exist.',
            'slug.unique' => 'This slug is already taken.',
            'password.min' => 'The password must be at least 6 characters.',
            'password.max' => 'The password may not be greater than 255 characters.',
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
            'wedding_id' => 'wedding',
            'name' => 'invitation name',
            'description' => 'invitation description',
            'slug' => 'URL slug',
            'is_active' => 'active status',
            'is_locked' => 'locked status',
            'password' => 'access password',
        ];
    }
}
