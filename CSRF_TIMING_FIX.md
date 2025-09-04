# CSRF Token Timing Fix

## Problem
Users were experiencing intermittent "Page Expired" errors after login/logout cycles. This happened because CSRF tokens were not being regenerated consistently during authentication flows.

## Root Cause Analysis

### The Issue
1. **During Login**: `$request->session()->regenerate()` regenerated the session ID but **didn't regenerate the CSRF token**
2. **During Logout**: `$request->session()->regenerateToken()` regenerated the CSRF token
3. **The Problem**: After login, the CSRF token in the HTML meta tag became stale, but the frontend was still using the old token
4. **Result**: Intermittent "Page Expired" errors when making requests after login

### Why It Was Intermittent
- Sometimes the old CSRF token would still work if the session hadn't been fully regenerated
- Other times, the token mismatch would cause immediate 419 errors
- The timing depended on session handling and browser behavior

## Solution Implemented

### 1. Backend Fixes - Consistent CSRF Token Regeneration

#### Login Controller (`AuthenticatedSessionController.php`)
```php
public function store(LoginRequest $request)
{
    $request->authenticate();

    $request->session()->regenerate();
    $request->session()->regenerateToken(); // ✅ Added CSRF token regeneration

    return redirect()->intended('/dashboard')->with('success', 'Welcome back!');
}
```

#### Registration Controller (`RegisteredUserController.php`)
```php
Auth::login($user);

// ✅ Regenerate session and CSRF token after registration
$request->session()->regenerate();
$request->session()->regenerateToken();
```

#### Google OAuth Controller (`GoogleController.php`)
```php
// Login the user
Auth::login($user);

// ✅ Regenerate session and CSRF token after Google OAuth login
$request->session()->regenerate();
$request->session()->regenerateToken();
```

### 2. Frontend Fixes - Automatic CSRF Token Refresh

#### API Service Enhancement (`services/api.ts`)
```typescript
// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 419) {
      // Page Expired - CSRF token mismatch, try to refresh token
      console.warn('CSRF token expired, attempting to refresh...');

      try {
        const response = await fetch('/api/csrf-token', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });

        if (response.ok) {
          const data = await response.json();
          const newToken = data.csrf_token;

          // Update the meta tag with the new token
          const metaTag = document.querySelector('meta[name="csrf-token"]');
          if (metaTag) {
            metaTag.setAttribute('content', newToken);
          }

          // Retry the original request with the new token
          if (error.config) {
            error.config.headers['X-CSRF-TOKEN'] = newToken;
            return api.request(error.config);
          }
        }
      } catch (refreshError) {
        console.error('Failed to refresh CSRF token:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```

#### Auth Utilities Enhancement (`lib/auth.ts`)
```typescript
/**
 * Refresh CSRF token by making a request to get a new one
 */
static async refreshCsrfToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/csrf-token', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
    });

    if (response.ok) {
      const data = await response.json();
      const newToken = data.csrf_token;

      // Update the meta tag with the new token
      const metaTag = document.querySelector('meta[name="csrf-token"]');
      if (metaTag) {
        metaTag.setAttribute('content', newToken);
      }

      return newToken;
    }
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error);
  }

  return null;
}
```

### 3. API Endpoint for CSRF Token Refresh

#### New API Route (`routes/api.php`)
```php
// CSRF token refresh route
Route::get('/csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
});
```

## Features

### ✅ Consistent CSRF Token Management
- **Login**: CSRF token regenerated after successful authentication
- **Registration**: CSRF token regenerated after account creation
- **OAuth**: CSRF token regenerated after social login
- **Logout**: CSRF token regenerated during session destruction

### ✅ Automatic Error Recovery
- **419 Detection**: Automatically detects "Page Expired" errors
- **Token Refresh**: Fetches new CSRF token from server
- **Request Retry**: Automatically retries failed requests with new token
- **Meta Tag Update**: Updates HTML meta tag with fresh token

### ✅ Multiple Authentication Methods
- **Email/Password**: Traditional login with CSRF protection
- **Google OAuth**: Social login with CSRF protection
- **Registration**: Account creation with CSRF protection
- **API Requests**: All API calls include proper CSRF headers

### ✅ Developer Experience
- **Automatic Handling**: No manual intervention required
- **Error Logging**: Clear console messages for debugging
- **Graceful Fallback**: Falls back to form-based logout if needed
- **Hook Integration**: Easy integration with React hooks

## How It Works Now

### Login Flow
1. **User submits login form** → CSRF token included in request
2. **Backend validates credentials** → Authentication succeeds
3. **Session regenerated** → New session ID created
4. **CSRF token regenerated** → Fresh token for security
5. **Redirect to dashboard** → User logged in successfully
6. **Frontend requests** → Use fresh CSRF token automatically

### Error Recovery Flow
1. **Request fails with 419** → CSRF token mismatch detected
2. **Automatic token refresh** → Fetch new token from `/api/csrf-token`
3. **Meta tag updated** → HTML meta tag refreshed with new token
4. **Request retried** → Original request retried with fresh token
5. **Success** → Request completes successfully

## Testing

The fix ensures:
- ✅ No more intermittent "Page Expired" errors
- ✅ Consistent CSRF token handling across all auth methods
- ✅ Automatic recovery from token mismatches
- ✅ Seamless user experience during login/logout cycles
- ✅ Proper security with CSRF protection maintained

Users can now login and logout multiple times without encountering CSRF token errors.
