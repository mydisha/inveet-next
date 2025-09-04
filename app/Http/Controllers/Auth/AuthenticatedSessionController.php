<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\RefreshesCsrfToken;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthenticatedSessionController extends Controller
{
    use RefreshesCsrfToken;
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();
        $this->refreshCsrfToken($request); // Regenerate CSRF token after login

        return redirect()->intended('/dashboard')->with('success', 'Welcome back!');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        $userId = Auth::id();
        $sessionId = $request->session()->getId();

        \Log::info('Traditional logout called', ['user_id' => $userId, 'session_id' => $sessionId]);

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Force delete session from database
        \DB::table('sessions')->where('id', $sessionId)->delete();

        // Clear any cached user data
        $request->session()->flush();

        $this->refreshCsrfToken($request);

        \Log::info('Traditional logout completed', ['user_id' => $userId, 'session_id' => $sessionId]);

        return redirect('/')->with('success', 'You have been logged out successfully.');
    }
}
