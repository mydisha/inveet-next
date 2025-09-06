<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
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
     * Handle user login
     */
    public function authenticate(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'remember' => 'boolean'
        ]);

        try {
            Log::info('User login attempt', [
                'email' => $request->email,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);

            $credentials = $request->only('email', 'password');
            $remember = $request->boolean('remember');

            if (Auth::attempt($credentials, $remember)) {
                $request->session()->regenerate();

                Log::info('User login successful', [
                    'user_id' => Auth::id(),
                    'email' => $request->email,
                    'ip' => $request->ip()
                ]);

                // Check user role to determine redirect destination
                $user = Auth::user();
                if ($user->hasRole('admin') || $user->hasRole('super_admin')) {
                    return redirect()->intended('/backoffice');
                } else {
                    return redirect()->intended('/dashboard');
                }
            }

            Log::warning('User login failed - invalid credentials', [
                'email' => $request->email,
                'ip' => $request->ip()
            ]);

            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email');

        } catch (\Exception $e) {
            Log::error('Login error', [
                'error' => $e->getMessage(),
                'email' => $request->email,
                'ip' => $request->ip()
            ]);

            return back()->withErrors([
                'email' => 'An error occurred during login. Please try again.',
            ])->onlyInput('email');
        }
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

    /**
     * Handle user registration
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'terms' => 'required|accepted'
        ]);

        try {
            Log::info('User registration attempt', [
                'email' => $request->email,
                'name' => $request->name,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);

            $user = \App\Models\User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Assign default role (you may need to adjust this based on your role system)
            $user->assignRole('user');

            Log::info('User registration successful', [
                'user_id' => $user->id,
                'email' => $request->email,
                'ip' => $request->ip()
            ]);

            // Auto-login after registration
            Auth::login($user);
            $request->session()->regenerate();

            return redirect()->route('dashboard')->with('success', 'Account created successfully!');

        } catch (\Exception $e) {
            Log::error('Registration error', [
                'error' => $e->getMessage(),
                'email' => $request->email,
                'ip' => $request->ip()
            ]);

            return back()->withErrors([
                'email' => 'An error occurred during registration. Please try again.',
            ])->withInput($request->except('password', 'password_confirmation'));
        }
    }

    /**
     * Handle user logout
     */
    public function logout(Request $request)
    {
        try {
            // Log the logout attempt
            Log::info('User logout attempt', [
                'user_id' => Auth::id(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);

            // Logout from all guards
            Auth::logout();
            Auth::guard('sanctum')->logout();

            // Invalidate the session
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            Log::info('User logout successful', [
                'user_id' => Auth::id(),
                'ip' => $request->ip()
            ]);

            return Redirect::route('login')->with('success', 'You have been logged out successfully.');
        } catch (\Exception $e) {
            Log::error('Logout error', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'ip' => $request->ip()
            ]);

            // Even if there's an error, try to clear the session
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return Redirect::route('login')->with('error', 'There was an error during logout, but you have been logged out.');
        }
    }
}
