<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LogoutController extends Controller
{
    /**
     * Handle user logout using Laravel's built-in logout functionality
     */
    public function destroy(Request $request)
    {
        $userId = Auth::id();


        // Use Laravel's built-in logout method
        Auth::logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the CSRF token
        $request->session()->regenerateToken();


        // For Inertia.js requests, return a redirect response
        if ($request->header('X-Inertia')) {
            return redirect('/login');
        }

        // For API requests, return JSON
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
                'redirect' => '/login'
            ]);
        }

        // For traditional form requests, redirect with flash message
        return redirect('/login')->with('success', 'You have been logged out successfully.');
    }
}
