# Logout Implementation - Best Practices for Laravel + Inertia.js

## Overview
This document outlines the best practices implemented for logout functionality in a Laravel + Inertia.js application, ensuring security and proper session management without deleting database tables.

## Implementation Details

### 1. Centralized Logout Controller
**File**: `app/Http/Controllers/Auth/LogoutController.php`

**Features**:
- Handles both Inertia.js and API requests
- Proper session invalidation and regeneration
- Database session cleanup (security best practice)
- CSRF token refresh
- Comprehensive logging

**Key Methods**:
- `destroy()`: Main logout method for web routes
- `apiLogout()`: API-specific logout method

### 2. Route Configuration

#### Web Routes (`routes/auth.php`)
```php
Route::post('/logout', [LogoutController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
```

#### API Routes (`routes/api.php`)
```php
Route::post('/logout-api', [LogoutController::class, 'apiLogout']);
Route::post('/logout-public', function (Request $request) {
    // Fallback for expired sessions
});
```

### 3. Frontend Implementation

#### API Service (`resources/js/services/api.ts`)
- Uses `/api/logout-api` endpoint
- Proper error handling and fallback mechanisms
- Clears localStorage and session data

#### Auth Utilities (`resources/js/lib/auth.ts`)
- Centralized logout logic
- Multiple fallback methods
- Proper cleanup of client-side data

## Security Best Practices

### ✅ Session Management
1. **Session Invalidation**: `$request->session()->invalidate()`
2. **Token Regeneration**: `$request->session()->regenerateToken()`
3. **Database Cleanup**: `DB::table('sessions')->where('id', $sessionId)->delete()`
4. **Session Flush**: `$request->session()->flush()`

### ✅ Multi-Guard Logout
```php
Auth::guard('web')->logout();
Auth::guard('sanctum')->logout();
```

### ✅ CSRF Protection
- Automatic CSRF token refresh after logout
- Proper token handling in frontend requests

## Why NOT Delete Database Tables

### ❌ What NOT to Do
```php
// DON'T do this - it's dangerous and unnecessary
Schema::drop('sessions');
DB::table('users')->truncate();
```

### ✅ What TO Do Instead
1. **Session Cleanup**: Delete only the current user's session
2. **Token Invalidation**: Invalidate specific tokens
3. **Cache Clearing**: Clear user-specific cache
4. **Logout Logging**: Track logout events for security

## Request Type Handling

### Inertia.js Requests
```php
if ($request->header('X-Inertia')) {
    return response()->json([
        'success' => true,
        'message' => 'Logged out successfully',
        'redirect' => '/'
    ]);
}
```

### API Requests
```php
if ($request->expectsJson()) {
    return response()->json([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
}
```

### Traditional Form Requests
```php
return redirect('/')->with('success', 'You have been logged out successfully.');
```

## Frontend Integration

### React Component Usage
```typescript
import { logout } from '../lib/auth';

const handleLogout = async () => {
  try {
    await logout({
      useApi: true,
      redirectTo: '/',
      showFeedback: true
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

### Hook Usage
```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { logout, isLoading } = useAuth();

  return (
    <button onClick={logout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

## Error Handling

### Frontend Fallbacks
1. **API Logout** → **Public Logout** → **Form Logout**
2. **Graceful Degradation**: Always redirects even if logout fails
3. **User Feedback**: Clear success/error messages

### Backend Logging
```php
Log::info('Logout initiated', [
    'user_id' => $userId,
    'session_id' => $sessionId,
    'is_inertia' => $request->header('X-Inertia'),
    'is_api' => $request->expectsJson()
]);
```

## Testing

### Manual Testing
1. Test logout from different pages
2. Test with expired sessions
3. Test API and web logout methods
4. Verify session cleanup in database

### Automated Testing
```php
public function test_logout_clears_session()
{
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
}
```

## Troubleshooting

### Common Issues
1. **CSRF Token Mismatch**: Ensure token refresh after logout
2. **Session Not Cleared**: Check database session deletion
3. **Redirect Loops**: Verify logout redirect logic
4. **API Errors**: Check endpoint configuration

### Debug Steps
1. Check Laravel logs for logout events
2. Verify session table cleanup
3. Test with browser dev tools
4. Check network requests in browser

## Performance Considerations

### Database Optimization
- Only delete specific session records
- Use indexed queries for session cleanup
- Consider session garbage collection

### Frontend Optimization
- Clear localStorage efficiently
- Avoid unnecessary API calls
- Use proper loading states

## Security Considerations

### Session Security
- Force session invalidation
- Regenerate CSRF tokens
- Clear all user-specific data
- Log security events

### API Security
- Validate authentication state
- Handle expired tokens gracefully
- Prevent unauthorized access

This implementation ensures secure, efficient logout functionality while maintaining database integrity and providing excellent user experience.
