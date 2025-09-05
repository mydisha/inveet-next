<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends BaseController
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        parent::__construct($authService);
        $this->authService = $authService;
    }

    /**
     * Show the login page
     */
    public function login()
    {
        return Inertia::render('auth/login');
    }

    /**
     * Show the forgot password page
     */
    public function forgotPassword()
    {
        return Inertia::render('auth/ForgotPassword');
    }

    /**
     * Show the reset password page
     */
    public function resetPassword(Request $request, $token)
    {
        return Inertia::render('auth/ResetPassword', [
            'email' => $request->query('email'),
            'token' => $token,
        ]);
    }

    /**
     * Show the register page
     */
    public function register()
    {
        return Inertia::render('auth/register');
    }
}
