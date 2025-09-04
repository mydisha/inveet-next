<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'terms' => ['required', 'accepted'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_active' => true,
        ]);

        // Assign default role if needed
        if (method_exists($user, 'assignRole')) {
            $user->assignRole('customer');
        }

        event(new Registered($user));

        Auth::login($user);

        // Regenerate session and CSRF token after registration
        $request->session()->regenerate();
        $request->session()->regenerateToken();

        // Check if user has admin or super-admin role
        $redirectUrl = $user->hasAnyRole(['admin', 'super-admin']) ? '/backoffice' : '/dashboard';
        $successMessage = $user->hasAnyRole(['admin', 'super-admin'])
            ? 'Welcome to the backoffice! Your account has been created successfully.'
            : 'Welcome to Inveet! Your account has been created successfully.';

        // Check if this is an AJAX request (from Inertia.js)
        if (request()->header('X-Inertia')) {
            return redirect($redirectUrl)->with('success', $successMessage);
        }

        // For API requests, return JSON response
        return response()->json([
            'success' => true,
            'message' => $successMessage,
            'user' => $user,
            'redirect' => $redirectUrl
        ], 201);
    }
}
