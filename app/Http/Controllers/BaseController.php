<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\RefreshesCsrfToken;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Inertia\Inertia;

abstract class BaseController extends Controller
{
    use RefreshesCsrfToken;

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Get standardized user data for views
     */
    protected function getUserData($user)
    {
        return $this->authService->getUserData($user);
    }

    /**
     * Render Inertia page with user data
     */
    protected function renderWithUser(string $page, array $data = [], Request $request = null)
    {
        $user = $request ? $request->user() : auth()->user();

        $data['user'] = $this->getUserData($user);

        return Inertia::render($page, $data);
    }

    /**
     * Ensure CSRF token is fresh for authenticated pages
     */
    protected function ensureFreshCsrfToken(Request $request)
    {
        $this->refreshCsrfToken($request);
    }

    /**
     * Get user from request or return null
     */
    protected function getUser(Request $request)
    {
        return $request->user();
    }

    /**
     * Check if user is authenticated
     */
    protected function isAuthenticated(Request $request)
    {
        return $request->user() !== null;
    }

    /**
     * Redirect to login if not authenticated
     */
    protected function requireAuth(Request $request)
    {
        if (!$this->isAuthenticated($request)) {
            return redirect()->route('login');
        }

        return null;
    }
}
