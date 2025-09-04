<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\RefreshesCsrfToken;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LogoutController extends Controller
{
    use RefreshesCsrfToken;

    /**
     * Handle user logout with proper Inertia.js and API support
     */
    public function destroy(Request $request)
    {
        $userId = Auth::id();
        $sessionId = $request->session()->getId();

        Log::info('Logout initiated', [
            'user_id' => $userId,
            'session_id' => $sessionId,
            'is_inertia' => $request->header('X-Inertia'),
            'is_api' => $request->expectsJson()
        ]);

        // Logout from all guards
        Auth::guard('web')->logout();
        Auth::guard('sanctum')->logout();

        // Force delete session from database FIRST (before invalidating)
        if ($sessionId) {
            DB::table('sessions')->where('id', $sessionId)->delete();
            Log::info('Session deleted from database', ['session_id' => $sessionId]);
        }

        // Invalidate and regenerate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Clear any cached user data
        $request->session()->flush();

        // Clear any remaining auth state
        Auth::forgetGuards();

        // Refresh CSRF token for next request
        $this->refreshCsrfToken($request);

        Log::info('Logout completed', [
            'user_id' => $userId,
            'session_id' => $sessionId
        ]);

        // Handle different request types
        if ($request->expectsJson() || $request->header('X-Inertia')) {
            // API or Inertia.js request - return JSON
            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
                'redirect' => '/login'
            ]);
        }

        // Traditional form request - redirect
        return redirect('/login')->with('success', 'You have been logged out successfully.');
    }

    /**
     * API-specific logout endpoint
     */
    public function apiLogout(Request $request)
    {
        return $this->destroy($request);
    }
}
