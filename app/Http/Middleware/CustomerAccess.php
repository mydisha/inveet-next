<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CustomerAccess
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

        // Check if user has customer role (or no admin roles)
        $hasAdminRole = $user->hasAnyRole(['super-admin', 'admin', 'moderator']);

        if ($hasAdminRole) {
            // If user has admin roles, redirect to backoffice
            return redirect()->route('backoffice.dashboard')->with('info', 'This area is for customers only. Redirecting you to the backoffice.');
        }

        return $next($request);
    }
}
