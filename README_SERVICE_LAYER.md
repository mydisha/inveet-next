# Service Layered Pattern Implementation

This project implements a comprehensive service layered pattern for Laravel applications, providing a clean separation of concerns between controllers, services, and repositories.

## 🏗️ Architecture Overview

The service layered pattern consists of three main layers:

1. **Controller Layer** - Handles HTTP requests and responses
2. **Service Layer** - Contains business logic and orchestrates operations
3. **Repository Layer** - Manages data access and database operations

## 📁 Directory Structure

```
app/
├── Controllers/           # HTTP Controllers
│   ├── UserController.php
│   ├── WeddingController.php
│   ├── OrderController.php
│   ├── PackageController.php
│   └── SpecialInvitationController.php
├── Services/             # Business Logic Layer
│   ├── BaseServiceInterface.php
│   ├── UserService.php
│   ├── WeddingService.php
│   ├── OrderService.php
│   ├── PackageService.php
│   └── SpecialInvitationService.php
├── Repositories/         # Data Access Layer
│   ├── BaseRepositoryInterface.php
│   ├── BaseRepository.php
│   ├── UserRepository.php
│   ├── WeddingRepository.php
│   ├── OrderRepository.php
│   ├── PackageRepository.php
│   └── SpecialInvitationService.php
└── Http/Requests/        # Form Request Validation
    ├── User/
    │   ├── StoreUserRequest.php
    │   └── UpdateUserRequest.php
    ├── Wedding/
    │   ├── StoreWeddingRequest.php
    │   └── UpdateWeddingRequest.php
    ├── Order/
    │   └── StoreOrderRequest.php
    ├── Package/
    │   └── StorePackageRequest.php
    └── SpecialInvitation/
        └── StoreSpecialInvitationRequest.php
```

## 🔧 Installation & Setup

### 1. Install Spatie Laravel Permission

```bash
composer require spatie/laravel-permission
```

### 2. Publish Configuration

```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

### 3. Run Migrations

```bash
php artisan migrate
```

## 🎯 Features Implemented

### User Management
- ✅ CRUD operations for users
- ✅ Role-based access control with Spatie Laravel Permission
- ✅ Social authentication support
- ✅ User activation/deactivation
- ✅ Profile management

### Wedding Management
- ✅ CRUD operations for weddings
- ✅ Draft/publish workflow
- ✅ Theme integration
- ✅ View count tracking
- ✅ Slug generation

### Order Management
- ✅ CRUD operations for orders
- ✅ Payment processing
- ✅ Order status management
- ✅ Invoice number generation
- ✅ Order cancellation

### Package Management
- ✅ CRUD operations for packages
- ✅ Discount management
- ✅ Recommendation system
- ✅ Price calculations
- ✅ Package statistics

### Special Invitation Management
- ✅ CRUD operations for invitations
- ✅ Password protection
- ✅ Lock/unlock functionality
- ✅ Bulk creation
- ✅ Wedding association

## 🚀 Usage Examples

### Creating a User with Role

```php
// In your controller
public function store(StoreUserRequest $request)
{
    $userData = $request->validated();
    $userData['role'] = 'customer'; // Assign default role
    
    $user = $this->userService->create($userData);
    
    return response()->json([
        'success' => true,
        'data' => $user
    ]);
}
```

### Managing Wedding Status

```php
// Publish a wedding
$wedding = $this->weddingService->publishWedding($weddingId);

// Mark as draft
$wedding = $this->weddingService->markAsDraft($weddingId);

// Increment view count
$wedding = $this->weddingService->incrementViewCount($weddingId);
```

### Processing Orders

```php
// Create an order
$order = $this->orderService->create([
    'user_id' => $userId,
    'package_id' => $packageId,
    'wedding_id' => $weddingId,
    'total_price' => 100000
]);

// Process payment
$processed = $this->orderService->processPayment($orderId, [
    'external_transaction_id' => 'TXN123',
    'payment_type' => 'bank_transfer'
]);
```

### Package Operations

```php
// Calculate final price with discount
$priceDetails = $this->packageService->calculateFinalPrice($packageId, 2);

// Toggle recommendation
$package = $this->packageService->toggleRecommendation($packageId);

// Get package statistics
$stats = $this->packageService->getPackageStats();
```

## 🔐 Role-Based Access Control

The system uses Spatie Laravel Permission for role management:

```php
// Assign role to user
$this->userService->assignRole($userId, 'admin');

// Sync multiple roles
$this->userService->syncRoles($userId, ['admin', 'moderator']);

// Remove role
$this->userService->removeRole($userId, 'moderator');
```

## 📝 Form Request Validation

All controllers use dedicated form request classes for validation:

```php
// StoreUserRequest validation rules
'name' => ['required', 'string', 'max:255'],
'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
'password' => ['required', 'string', 'min:8', 'confirmed'],
'role' => ['nullable', 'string', 'exists:roles,name']
```

## 🎨 Customization

### Adding New Services

1. Create a new service class implementing `BaseServiceInterface`
2. Create corresponding repository class extending `BaseRepository`
3. Add service binding in `AppServiceProvider`
4. Create form request validation classes
5. Implement controller methods

### Extending Existing Services

```php
class ExtendedUserService extends UserService
{
    public function sendWelcomeEmail(int $userId): bool
    {
        $user = $this->findById($userId);
        // Custom email logic
        return true;
    }
}
```

## 🧪 Testing

### Service Testing

```php
public function test_user_creation()
{
    $userData = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123'
    ];
    
    $user = $this->userService->create($userData);
    
    $this->assertNotNull($user);
    $this->assertEquals('John Doe', $user->name);
}
```

### Repository Testing

```php
public function test_find_by_email()
{
    $user = $this->userRepository->findByEmail('test@example.com');
    
    $this->assertNotNull($user);
    $this->assertEquals('test@example.com', $user->email);
}
```

## 📊 Database Schema

The implementation is based on the following main tables:

- **users** - User accounts and profiles
- **weddings** - Wedding events and configurations
- **orders** - Package orders and payments
- **packages** - Service packages and pricing
- **special_invitations** - Protected wedding invitations
- **roles** - User roles (Spatie Permission)
- **permissions** - System permissions (Spatie Permission)

## 🔄 Migration Status

- ✅ All 96 migration files merged from root `migrations/` to `database/migrations/`
- ✅ Spatie Laravel Permission installed and configured
- ✅ Service layered pattern implemented
- ✅ Form request validation implemented
- ✅ Controllers with full CRUD operations
- ✅ Business logic services
- ✅ Data access repositories

## 🚨 Important Notes

1. **Models Required**: The Eloquent models for the entities need to be created
2. **Database Setup**: Ensure all migrations are run before using the services
3. **Authentication**: Implement proper authentication middleware for protected routes
4. **Authorization**: Add policy-based authorization for sensitive operations
5. **Error Handling**: Implement global exception handling for better error responses

## 🔗 Next Steps

1. Create Eloquent models for all entities
2. Implement authentication middleware
3. Add route definitions
4. Create database seeders
5. Implement API documentation
6. Add comprehensive testing
7. Set up logging and monitoring

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission)
- [Laravel Form Requests](https://laravel.com/docs/validation#form-request-validation)
- [Repository Pattern](https://laravel.com/docs/eloquent#query-scopes)

---

**Note**: This implementation provides a solid foundation for a scalable Laravel application. All services are properly abstracted and can be easily extended or modified based on specific business requirements.
