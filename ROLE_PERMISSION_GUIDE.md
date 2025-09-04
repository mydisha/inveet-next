# Role and Permission System Guide

This project uses Spatie Laravel Permission package to manage user roles and permissions.

## Overview

The system includes the following roles:
- **super-admin**: Has all permissions
- **admin**: Has most administrative permissions
- **moderator**: Has limited administrative permissions
- **customer**: Has permissions for managing their own content
- **guest**: Has read-only permissions

## Available Permissions

### User Management
- `view-users`: View user list
- `create-users`: Create new users
- `edit-users`: Edit user information
- `delete-users`: Delete users
- `activate-users`: Activate user accounts
- `deactivate-users`: Deactivate user accounts
- `assign-roles`: Assign roles to users

### Wedding Management
- `view-weddings`: View wedding list
- `create-weddings`: Create new weddings
- `edit-weddings`: Edit wedding information
- `delete-weddings`: Delete weddings
- `publish-weddings`: Publish weddings
- `unpublish-weddings`: Unpublish weddings
- `activate-weddings`: Activate weddings
- `deactivate-weddings`: Deactivate weddings

### Order Management
- `view-orders`: View order list
- `create-orders`: Create new orders
- `edit-orders`: Edit order information
- `delete-orders`: Delete orders
- `process-payments`: Process payments
- `cancel-orders`: Cancel orders
- `mark-orders-paid`: Mark orders as paid
- `mark-orders-void`: Mark orders as void

### Package Management
- `view-packages`: View package list
- `create-packages`: Create new packages
- `edit-packages`: Edit package information
- `delete-packages`: Delete packages
- `activate-packages`: Activate packages
- `deactivate-packages`: Deactivate packages
- `manage-discounts`: Manage package discounts
- `toggle-recommendations`: Toggle package recommendations

### Special Invitation Management
- `view-invitations`: View invitation list
- `create-invitations`: Create new invitations
- `edit-invitations`: Edit invitation information
- `delete-invitations`: Delete invitations
- `lock-invitations`: Lock invitations
- `unlock-invitations`: Unlock invitations
- `manage-passwords`: Manage invitation passwords
- `bulk-create-invitations`: Bulk create invitations

### Theme Management
- `view-themes`: View theme list
- `create-themes`: Create new themes
- `edit-themes`: Edit theme information
- `delete-themes`: Delete themes
- `activate-themes`: Activate themes
- `deactivate-themes`: Deactivate themes

### System Management
- `view-statistics`: View system statistics
- `manage-settings`: Manage system settings
- `view-logs`: View system logs

## Usage

### In Controllers

Use the `authorize()` method to check permissions:

```php
public function index(Request $request): JsonResponse
{
    $this->authorize('view-users');

    // Controller logic here
}
```

### In Middleware

Use the custom middleware for route protection:

```php
// In routes/api.php
Route::middleware(['auth:sanctum', 'spatie.permission:view-users'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
});

// For role-based protection
Route::middleware(['auth:sanctum', 'spatie.role:admin,super-admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});
```

### In Blade Templates

```php
@can('view-users')
    <a href="{{ route('users.index') }}">View Users</a>
@endcan

@role('admin')
    <a href="{{ route('admin.dashboard') }}">Admin Dashboard</a>
@endrole
```

### In JavaScript/Frontend

Check user permissions in your frontend:

```javascript
// Assuming you have user data with roles and permissions
if (user.can('view-users')) {
    // Show user management interface
}

if (user.hasRole('admin')) {
    // Show admin features
}
```

## Commands

### Assign Role to User

```bash
php artisan user:assign-role user@example.com admin
```

### Seed Roles and Permissions

```bash
php artisan db:seed --class=RolePermissionSeeder
```

### Seed Users with Roles

```bash
php artisan db:seed --class=UserSeeder
```

## Default Users

After running the UserSeeder, you'll have these default users:

- **Super Admin**: admin@inveet.com / password123
- **Admin**: admin@example.com / password123
- **Moderator**: moderator@example.com / password123
- **Customer**: customer@example.com / password123
- **Guest**: guest@example.com / password123

## Testing

Run the role and permission tests:

```bash
php artisan test tests/Feature/RolePermissionTest.php
```

## Best Practices

1. **Use permissions over roles** in controllers for fine-grained control
2. **Use roles in middleware** for broad access control
3. **Always check permissions** before allowing access to sensitive operations
4. **Use the authorize() method** in controllers for automatic 403 responses
5. **Test your permissions** to ensure they work as expected

## Security Notes

- All permission checks return 403 Forbidden if the user lacks the required permission
- Unauthenticated users receive 401 Unauthorized responses
- The system automatically caches permissions for better performance
- Always validate user input when assigning roles or permissions
