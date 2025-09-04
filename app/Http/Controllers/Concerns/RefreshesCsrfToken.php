<?php

namespace App\Http\Controllers\Concerns;

trait RefreshesCsrfToken
{
    /**
     * Refresh CSRF token for authenticated pages
     * This ensures CSRF token is fresh after login redirects
     */
    protected function refreshCsrfToken($request)
    {
        $request->session()->regenerateToken();
    }
}
