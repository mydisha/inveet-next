<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class WebApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Try to authenticate using web guard first
        if (Auth::guard('web')->check()) {
            // Set the user for the request
            $request->setUserResolver(function () {
                return Auth::guard('web')->user();
            });

            return $next($request);
        }

        // If web guard fails, try sanctum
        if (Auth::guard('sanctum')->check()) {
            return $next($request);
        }

        // If both fail, return unauthorized
        return response()->json([
            'success' => false,
            'message' => 'Unauthenticated'
        ], 401);
    }
}
