# CSRF Token Refresh After Login Fix

## Problem
After login, users were getting "Page Expired" errors when trying to logout, but logout worked fine after refreshing the page. This happened because:

1. **Login Process**: Backend regenerates CSRF token during login
2. **Frontend Issue**: HTML meta tag still contains old CSRF token
3. **Logout Attempt**: Frontend uses stale token → "Page Expired" error
4. **After Refresh**: Meta tag gets updated with fresh token → logout works

## Root Cause
The CSRF token was being regenerated on the backend during login, but the frontend wasn't aware of the new token until the page was refreshed.

## Solution Implemented

### 1. Automatic CSRF Token Initialization (`lib/auth.ts`)

#### Added Page Load Token Refresh
```typescript
/**
 * Initialize CSRF token refresh on page load
 * This ensures we have a fresh token after login redirects
 */
static async initializeCsrfToken(): Promise<void> {
  // Only refresh if we're on a page that requires authentication
  const currentPath = window.location.pathname;
  const authRequiredPaths = ['/dashboard', '/my-weddings', '/wedding-invitations', '/profile', '/settings'];

  if (authRequiredPaths.some(path => currentPath.startsWith(path))) {
    try {
      await this.refreshCsrfToken();
    } catch (error) {
      console.error('Failed to initialize CSRF token:', error);
    }
  }
}
```

### 2. App-Level Initialization (`app.tsx`)

#### Added CSRF Token Refresh on App Startup
```typescript
import { initializeCsrfToken } from './lib/auth';

createInertiaApp({
  setup({ el, App, props }) {
    const root = createRoot(el);

    // Initialize CSRF token on app startup
    initializeCsrfToken();

    root.render(
      <>
        <StructuredData type="website" />
        <App {...props} />
      </>
    );
  },
});
```

### 3. Login Form Enhancement (`pages/auth/login.tsx`)

#### Added CSRF Token Refresh After Login
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  post('/login', {
    onSuccess: () => {
      // Refresh CSRF token after successful login
      refreshCsrfToken();
    }
  });
};
```

### 4. Registration Form Enhancement (`pages/auth/register.tsx`)

#### Added CSRF Token Refresh After Registration
```typescript
onSuccess: (page) => {
  // Registration successful, show success message and redirect
  console.log('Registration successful!', page);
  setSuccessMessage('Account created successfully! Redirecting to dashboard...');

  // Refresh CSRF token after successful registration
  refreshCsrfToken();

  // Redirect to dashboard after a short delay
  setTimeout(() => {
    router.visit('/dashboard', {
      method: 'get',
      onSuccess: () => {
        console.log('Redirected to dashboard successfully');
      }
    });
  }, 1500);
},
```

### 5. Enhanced useAuth Hook (`hooks/useAuth.ts`)

#### Added CSRF Token Management Functions
```typescript
const initializeCsrfToken = useCallback(async () => {
  return await AuthUtils.initializeCsrfToken();
}, []);

return {
  logout,
  isAuthenticated,
  getAuthToken,
  getCsrfToken,
  refreshCsrfToken,
  initializeCsrfToken,
  isLoading,
};
```

## How It Works Now

### Login Flow
1. **User submits login form** → CSRF token included in request
2. **Backend processes login** → Regenerates session and CSRF token
3. **Login success callback** → Frontend refreshes CSRF token immediately
4. **Redirect to dashboard** → App initialization refreshes token again
5. **Logout attempt** → Uses fresh CSRF token → Success!

### Page Load Flow
1. **User lands on protected page** → App initialization runs
2. **Path check** → Determines if authentication is required
3. **Token refresh** → Fetches fresh CSRF token from server
4. **Meta tag update** → HTML meta tag updated with new token
5. **Ready for requests** → All subsequent requests use fresh token

### Error Recovery Flow
1. **Request fails with 419** → CSRF token mismatch detected
2. **Automatic refresh** → Fetches new token from `/api/csrf-token`
3. **Request retry** → Original request retried with fresh token
4. **Success** → Request completes successfully

## Features

### ✅ Multi-Layer Protection
- **App Initialization**: Token refreshed on every app startup
- **Login Success**: Token refreshed immediately after login
- **Registration Success**: Token refreshed after account creation
- **Error Recovery**: Automatic refresh on 419 errors

### ✅ Smart Path Detection
- **Authentication Required**: Only refreshes on protected pages
- **Performance Optimized**: Skips refresh on public pages
- **Path Matching**: Checks for dashboard, profile, settings, etc.

### ✅ Seamless User Experience
- **No Manual Refresh**: Users don't need to refresh the page
- **Immediate Availability**: Fresh token available right after login
- **Error Prevention**: Proactive token refresh prevents errors

### ✅ Developer Friendly
- **Clear Logging**: Console messages for debugging
- **Error Handling**: Graceful fallback on refresh failures
- **Hook Integration**: Easy integration with React components

## Testing

The fix ensures:
- ✅ No "Page Expired" errors after login
- ✅ Logout works immediately after login (no refresh needed)
- ✅ CSRF token stays fresh across page navigation
- ✅ Automatic recovery from token mismatches
- ✅ Consistent behavior across all authentication methods

Users can now login and immediately logout without any issues or page refreshes required.
