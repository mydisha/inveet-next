<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    /**
     * Get standardized user data for views
     */
    public function getUserData($user)
    {
        if (!$user) {
            return null;
        }

        // Safely get roles with fallback
        $roles = [];
        try {
            if (method_exists($user, 'roles') && $user->roles) {
                $roles = $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                })->toArray();
            }
        } catch (\Exception $e) {
            // If roles relationship fails, return empty array
            $roles = [];
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'hasWedding' => $user->hasWedding ?? false,
            'roles' => $roles,
        ];
    }

    /**
     * Register a new user
     */
    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $data['is_active'] = true;

        return User::create($data);
    }

    /**
     * Login user
     */
    public function login(array $credentials, bool $remember = false)
    {
        if (Auth::attempt($credentials, $remember)) {
            return Auth::user();
        }

        return false;
    }

    /**
     * Logout user
     */
    public function logout()
    {
        Auth::logout();
    }

    /**
     * Generate password reset token
     */
    public function generatePasswordResetToken(string $email)
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return false;
        }

        return app('auth.password.broker')->createToken($user);
    }

    /**
     * Reset password
     */
    public function resetPassword(array $data)
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return false;
        }

        $user->password = Hash::make($data['password']);
        $user->save();

        // Clear password reset tokens
        app('auth.password.broker')->deleteToken($user);

        return $user;
    }

    /**
     * Check if user is authenticated
     */
    public function check()
    {
        return Auth::check();
    }

    /**
     * Get current authenticated user
     */
    public function user()
    {
        return Auth::user();
    }
}
