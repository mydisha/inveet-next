<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class BackofficeAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Check if user has admin or super-admin role
        if (!$user->hasAnyRole(['admin', 'super-admin'])) {
            // If user has customer role, redirect to customer dashboard
            if ($user->hasRole('customer')) {
                return redirect()->route('dashboard')->with('info', 'This area is for administrators only. Redirecting you to your dashboard.');
            }

            // For other roles or no roles, redirect to appropriate dashboard
            return redirect()->route('dashboard')->with('info', 'Access denied. Redirecting you to your dashboard.');
        }

        return $next($request);
    }
}
