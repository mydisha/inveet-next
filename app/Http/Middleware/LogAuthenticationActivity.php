<?php

namespace App\Http\Middleware;

use App\Services\ActivityLogService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogAuthenticationActivity
{
    protected $activityLogService;

    public function __construct(ActivityLogService $activityLogService)
    {
        $this->activityLogService = $activityLogService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Log authentication activities
        if ($request->is('api/auth/login') && $response->getStatusCode() === 200) {
            $user = Auth::user();
            if ($user) {
                $this->activityLogService->logLogin($user, 'email');
            }
        }

        if ($request->is('api/auth/logout') && $response->getStatusCode() === 200) {
            $user = Auth::user();
            if ($user) {
                $this->activityLogService->logLogout($user);
            }
        }

        if ($request->is('api/auth/register') && $response->getStatusCode() === 201) {
            $user = Auth::user();
            if ($user) {
                $this->activityLogService->logRegistration($user);
            }
        }

        return $response;
    }
}
