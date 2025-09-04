# Logout Function Implementation

## Overview
The logout functionality has been implemented with a centralized approach that provides both API-based and form-based logout methods with proper error handling and fallback mechanisms.

## Implementation Details

### 1. Centralized Auth Utilities (`resources/js/lib/auth.ts`)
- **AuthUtils class**: Provides centralized authentication utilities
- **logout()**: Main logout function with multiple options
- **clearAuthData()**: Cleans up localStorage
- **isAuthenticated()**: Checks authentication status

### 2. Custom Hook (`resources/js/hooks/useAuth.ts`)
- **useAuth()**: React hook for authentication functionality
- Provides loading state management
- Easy integration with React components

### 3. API Service Integration (`resources/js/services/api.ts`)
- Enhanced logout method with proper error handling
- Clears all authentication-related data
- Returns success status

## Usage Examples

### Basic Usage
```typescript
import { logout } from '../lib/auth';

// Simple logout
await logout();

// With options
await logout({
  useApi: true,
  redirectTo: '/login',
  showFeedback: true
});
```

### Using the Hook
```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout({
      useApi: true,
      redirectTo: '/',
      showFeedback: true
    });
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

## Features

### ✅ Dual Logout Methods
- **API-based**: Uses `/api/logout` endpoint
- **Form-based**: Fallback using traditional form submission to `/logout`

### ✅ Error Handling
- Automatic fallback from API to form-based logout
- Proper error logging
- Graceful degradation

### ✅ Data Cleanup
- Removes auth tokens from localStorage
- Clears user data
- Cleans up wedding data

### ✅ User Experience
- Loading states
- Proper redirects
- Success feedback

### ✅ Security
- CSRF token handling
- Session invalidation
- Token regeneration

## Backend Integration

The logout functionality integrates with Laravel's authentication system:

- **Route**: `POST /logout` and `POST /api/logout`
- **Controller**: `AuthenticatedSessionController@destroy`
- **Middleware**: `auth` middleware for protection
- **Session**: Proper session invalidation and token regeneration

## Updated Components

The following components have been updated to use the new centralized logout:

1. **Header.tsx** - Main navigation header
2. **InvitationList.tsx** - Wedding invitation management
3. **Configuration.tsx** - Wedding configuration page

All components now use the same logout implementation with consistent behavior and error handling.
