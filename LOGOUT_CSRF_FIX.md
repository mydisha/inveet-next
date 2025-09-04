# Logout CSRF Token Fix

## Problem
Users were getting a "Page Expired" error when trying to logout. This is a CSRF (Cross-Site Request Forgery) token issue.

## Root Cause
The CSRF token meta tag was missing from the main HTML template, causing Laravel to reject logout requests as potentially malicious.

## Solution

### 1. Added CSRF Token Meta Tag (`resources/views/app.blade.php`)

```html
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
```

This ensures that the CSRF token is available to JavaScript for all form submissions and AJAX requests.

### 2. Enhanced API Service (`resources/js/services/api.ts`)

#### Added CSRF Token to Request Headers
```typescript
// Request interceptor to add auth token and CSRF token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for stateful requests
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### 3. Improved Auth Utilities (`resources/js/lib/auth.ts`)

#### Enhanced Form-Based Logout
```typescript
private static logoutViaForm(): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = '/logout';

  // Add CSRF token
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (csrfToken) {
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_token';
    tokenInput.value = csrfToken;
    form.appendChild(tokenInput);
  } else {
    console.error('CSRF token not found. Cannot perform logout.');
    // Fallback: redirect to home page
    window.location.href = '/';
    return;
  }

  // Submit form
  document.body.appendChild(form);
  form.submit();
}
```

#### Added CSRF Token Utility
```typescript
/**
 * Get CSRF token from meta tag
 */
static getCsrfToken(): string | null {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || null;
}
```

### 4. Enhanced useAuth Hook (`resources/js/hooks/useAuth.ts`)

Added CSRF token functionality to the React hook:

```typescript
const getCsrfToken = useCallback(() => {
  return AuthUtils.getCsrfToken();
}, []);

return {
  logout,
  isAuthenticated,
  getAuthToken,
  getCsrfToken,
  isLoading,
};
```

## Features

### ✅ CSRF Protection
- **Meta Tag**: CSRF token available in HTML head
- **API Headers**: Automatic CSRF token inclusion in API requests
- **Form Submission**: Proper CSRF token handling for form-based logout
- **Error Handling**: Graceful fallback when CSRF token is missing

### ✅ Multiple Logout Methods
- **API-Based**: Uses `/api/logout` with proper headers
- **Form-Based**: Traditional form submission with CSRF token
- **Automatic Fallback**: Falls back to form-based if API fails
- **Error Recovery**: Redirects to home if CSRF token is missing

### ✅ Security Improvements
- **Token Validation**: Laravel validates CSRF tokens on all state-changing requests
- **Session Protection**: Prevents cross-site request forgery attacks
- **Secure Headers**: Proper X-CSRF-TOKEN header for AJAX requests

## How It Works

1. **Page Load**: CSRF token is embedded in HTML meta tag
2. **API Requests**: Axios interceptor adds X-CSRF-TOKEN header
3. **Form Submission**: JavaScript adds _token field to forms
4. **Laravel Validation**: Backend validates CSRF token on all POST requests
5. **Logout Success**: User is properly logged out and redirected

## Testing

The logout functionality now:
- ✅ Includes proper CSRF token in all requests
- ✅ Handles both API and form-based logout methods
- ✅ Provides graceful error handling
- ✅ Prevents "Page Expired" errors
- ✅ Maintains security best practices

Users can now logout successfully without encountering CSRF token errors.
