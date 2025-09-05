# System Design Guidelines

This document outlines the standardized patterns and conventions for developing new pages and features in the Inveet Next application. Following these guidelines ensures consistency, maintainability, and scalability across the entire codebase.

## Table of Contents

1. [Frontend Architecture](#frontend-architecture)
2. [Backend Architecture](#backend-architecture)
3. [Page Development Standards](#page-development-standards)
4. [Component Development Standards](#component-development-standards)
5. [API Development Standards](#api-development-standards)
6. [Routing Standards](#routing-standards)
7. [UI/UX Standards](#uiux-standards)
8. [Security Standards](#security-standards)
9. [Testing Standards](#testing-standards)
10. [File Organization](#file-organization)

## Frontend Architecture

### Layout System

The application uses a **role-based layout system** that automatically determines the appropriate layout based on user roles and current path:

#### Layout Components Hierarchy
```
RoleBasedLayout (Root Layout)
├── BackofficeLayout (Admin/Moderator users)
│   └── BackofficeSidebar
└── DashboardLayout (Customer users)
    └── Sidebar
```

#### Layout Selection Logic
- **Backoffice Layout**: Used when user has admin roles (`super-admin`, `admin`, `moderator`) AND current path starts with `/backoffice`
- **Dashboard Layout**: Used for all other authenticated users
- **Guest Layout**: Used for unauthenticated users (login, register, landing)

### Page Structure Standards

#### 1. Page Component Structure
```tsx
import { Head } from '@inertiajs/react';
import LayoutComponent from '@/components/layout/AppropriateLayout';
import { PageHeader } from '@/components/ui/page-header';
// ... other imports

interface PageProps {
  user: User | null;
  // ... other props
}

export default function PageName({ user, ...props }: PageProps) {
  // Page logic here

  return (
    <LayoutComponent user={user}>
      <Head title="Page Title" />

      <PageHeader
        title="Page Title"
        description="Page description"
        // ... other props
      />

      {/* Page content */}
    </LayoutComponent>
  );
}
```

#### 2. Layout Component Selection
```tsx
// Determine appropriate layout based on user role
const hasAdminRole = user?.roles?.some(role =>
  ['super-admin', 'admin', 'moderator'].includes(role.name)
) || false;

const LayoutComponent = hasAdminRole ? BackofficeLayout : DashboardLayout;
```

### Component Development Standards

#### 1. Component File Structure
```
resources/js/components/
├── ui/                    # Reusable UI components
├── layout/               # Layout components
├── dashboard/            # Dashboard-specific components
├── backoffice/           # Backoffice-specific components
└── [feature]/            # Feature-specific components
```

#### 2. Component Naming Conventions
- **PascalCase** for component files and exports
- **Descriptive names** that indicate purpose
- **Consistent prefixes** for related components (e.g., `DashboardCard`, `DashboardSection`)

#### 3. Component Props Interface
```tsx
interface ComponentProps {
  // Required props first
  title: string;
  user: User;

  // Optional props with defaults
  description?: string;
  className?: string;

  // Event handlers
  onSubmit?: (data: any) => void;
  onCancel?: () => void;

  // Children
  children?: React.ReactNode;
}
```

#### 4. Component Export Pattern
```tsx
// Default export for main component
export default function ComponentName(props: ComponentProps) {
  // Component implementation
}

// Named exports for sub-components
export { SubComponent1, SubComponent2 };
```

## Backend Architecture

### Service Layer Pattern

The application follows a **Service-Repository pattern** for clean separation of concerns:

#### 1. Service Interface
```php
interface BaseServiceInterface
{
    public function getAll(array $filters = []);
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function paginate(int $perPage = 15, array $filters = []);
}
```

#### 2. Service Implementation
```php
class EntityService implements BaseServiceInterface
{
    protected $entityRepository;

    public function __construct(EntityRepository $entityRepository)
    {
        $this->entityRepository = $entityRepository;
    }

    public function getAll(array $filters = [])
    {
        // Business logic here
        return $this->entityRepository->all();
    }

    // ... other methods
}
```

#### 3. Repository Pattern
```php
abstract class BaseRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    // Common CRUD operations
    public function all(array $columns = ['*'])
    {
        return $this->model->all($columns);
    }

    // ... other methods
}
```

### Controller Standards

#### 1. Controller Structure
```php
class EntityController extends Controller
{
    protected $entityService;

    public function __construct(EntityService $entityService)
    {
        $this->entityService = $entityService;
    }

    public function index(Request $request): JsonResponse
    {
        $this->authorize('view-entities');

        $filters = $request->only(['filter1', 'filter2']);
        $entities = $this->entityService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $entities,
            'message' => 'Entities retrieved successfully'
        ]);
    }

    // ... other methods
}
```

#### 2. API Response Format
```php
// Success Response
return response()->json([
    'success' => true,
    'data' => $data,
    'message' => 'Operation completed successfully'
], Response::HTTP_OK);

// Error Response
return response()->json([
    'success' => false,
    'message' => 'Error message',
    'errors' => $validationErrors // if applicable
], Response::HTTP_BAD_REQUEST);
```

## Page Development Standards

### 1. New Page Checklist

When creating a new page, ensure:

- [ ] **Layout Selection**: Choose appropriate layout based on user role
- [ ] **Page Header**: Include consistent page header with title and description
- [ ] **Loading States**: Implement loading states for async operations
- [ ] **Error Handling**: Handle errors gracefully with user feedback
- [ ] **Responsive Design**: Ensure mobile-first responsive design
- [ ] **Accessibility**: Include proper ARIA labels and keyboard navigation
- [ ] **SEO**: Set appropriate page title and meta tags

### 2. Page Types

#### Dashboard Pages
```tsx
import { DashboardPage, PageHeader, DashboardSection } from '@/components/dashboard';

export default function DashboardPage({ user, data }) {
  return (
    <DashboardPage
      title="Dashboard"
      user={user}
      currentPath="/dashboard"
    >
      <PageHeader
        title="Welcome to Dashboard"
        description="Manage your account and settings"
      />

      <DashboardSection title="Overview">
        {/* Content */}
      </DashboardSection>
    </DashboardPage>
  );
}
```

#### Backoffice Pages
```tsx
import BackofficeLayout from '@/components/backoffice/BackofficeLayout';

export default function BackofficePage({ user, data }) {
  return (
    <BackofficeLayout user={user}>
      <Head title="Backoffice - Page Title" />

      {/* Page content */}
    </BackofficeLayout>
  );
}
```

#### Form Pages
```tsx
import StandardFormLayout from '@/components/dashboard/StandardFormLayout';

export default function FormPage({ user, data }) {
  return (
    <StandardFormLayout
      title="Form Title"
      description="Form description"
      backHref="/previous-page"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Form fields */}
    </StandardFormLayout>
  );
}
```

### 3. State Management

#### Local State
- Use `useState` for simple component state
- Use `useReducer` for complex state logic
- Keep state as close to where it's used as possible

#### Server State
- Use Inertia.js for server-side state management
- Implement proper loading states
- Handle errors with user feedback

#### Global State
- Use React Context for global state when needed
- Keep global state minimal and focused

## API Development Standards

### 1. Route Organization

#### Web Routes (`routes/web.php`)
```php
// Public routes
Route::get('/', [FrontendController::class, 'landing'])->name('home');

// Guest-only routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [FrontendController::class, 'login'])->name('login');
    Route::get('/register', [FrontendController::class, 'register'])->name('register');
});

// Customer routes
Route::middleware(['auth', 'customer'])->group(function () {
    Route::get('/dashboard', [FrontendController::class, 'dashboard'])->name('dashboard');
    // ... other customer routes
});

// Backoffice routes
Route::middleware(['auth', 'backoffice'])->prefix('backoffice')->group(function () {
    Route::get('/', [FrontendController::class, 'backofficeDashboard'])->name('backoffice.dashboard');
    // ... other backoffice routes
});
```

#### API Routes (`routes/api.php`)
```php
// Public API routes
Route::get('/packages', [PackageController::class, 'index']);

// Protected API routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    // ... other protected routes
});
```

### 2. Middleware Usage

#### Authentication Middleware
- `auth`: Basic authentication
- `auth:sanctum`: API token authentication
- `guest`: Guest-only access

#### Authorization Middleware
- `customer`: Customer role access
- `backoffice`: Admin/Moderator access
- `csrf`: CSRF protection for web routes

### 3. Request Validation

#### Form Request Classes
```php
class StoreEntityRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('create-entities');
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:entities,email',
            // ... other rules
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'email.unique' => 'Email already exists',
            // ... other messages
        ];
    }
}
```

## UI/UX Standards

### 1. Design System

The application uses a **consistent design system** with:

#### Color Palette
- **Primary**: Brand colors for main actions
- **Secondary**: Supporting colors
- **Neutral**: Grays for text and backgrounds
- **Status**: Success, warning, error colors

#### Typography
- **Font Family**: Inter (primary), system fonts (fallback)
- **Font Sizes**: Consistent scale (text-xs to text-6xl)
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

#### Spacing
- **Consistent spacing scale**: 4px base unit
- **Padding/Margin**: Use Tailwind spacing classes
- **Component spacing**: Follow 8px grid system

### 2. Component Standards

#### Button Variants
```tsx
<Button variant="default">Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
```

#### Card Components
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

#### Form Components
```tsx
<FormField>
  <Label htmlFor="field">Field Label</Label>
  <Input id="field" placeholder="Enter value" />
  <FormMessage>Error message</FormMessage>
</FormField>
```

### 3. Responsive Design

#### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

#### Mobile-First Approach
```tsx
<div className="
  grid grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
">
  {/* Responsive grid */}
</div>
```

## Security Standards

### 1. Authentication & Authorization

#### User Roles
- **super-admin**: Full system access
- **admin**: Backoffice access
- **moderator**: Limited backoffice access
- **customer**: Customer dashboard access

#### Permission System
```php
// Check permissions in controllers
$this->authorize('view-entities');
$this->authorize('create-entities');
$this->authorize('update-entities');
$this->authorize('delete-entities');
```

### 2. Data Validation

#### Input Validation
- **Server-side validation**: Always validate on backend
- **Client-side validation**: Provide immediate feedback
- **Sanitization**: Sanitize all user inputs

#### CSRF Protection
- **Web routes**: CSRF tokens required
- **API routes**: Use Sanctum tokens

### 3. Security Headers

#### Middleware Implementation
```php
class SecurityHeaders
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        return $response;
    }
}
```

## Testing Standards

### 1. Frontend Testing

#### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

test('renders component correctly', () => {
  render(<ComponentName title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

#### Integration Testing
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { router } from '@inertiajs/react';

test('handles form submission', async () => {
  render(<FormComponent />);

  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'Test Name' }
  });

  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  // Assert expected behavior
});
```

### 2. Backend Testing

#### Feature Testing
```php
class EntityTest extends TestCase
{
    public function test_can_create_entity()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/api/entities', [
                'name' => 'Test Entity',
                'email' => 'test@example.com'
            ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('entities', [
            'name' => 'Test Entity'
        ]);
    }
}
```

## File Organization

### 1. Frontend Structure
```
resources/js/
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   ├── dashboard/       # Dashboard components
│   └── backoffice/      # Backoffice components
├── pages/               # Page components
│   ├── backoffice/      # Backoffice pages
│   └── Profile/         # Feature-specific pages
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
└── types/               # TypeScript type definitions
```

### 2. Backend Structure
```
app/
├── Http/
│   ├── Controllers/     # API and web controllers
│   ├── Middleware/      # Custom middleware
│   └── Requests/        # Form request validation
├── Models/              # Eloquent models
├── Services/            # Business logic services
├── Repositories/        # Data access layer
└── Helpers/             # Utility helpers
```

### 3. Naming Conventions

#### Files
- **PascalCase** for component files: `UserProfile.tsx`
- **kebab-case** for utility files: `api-client.ts`
- **snake_case** for PHP files: `user_controller.php`

#### Directories
- **kebab-case** for feature directories: `user-profile/`
- **PascalCase** for component directories: `UserProfile/`

## Development Workflow

### 1. Creating a New Page

1. **Plan the page structure** and determine layout type
2. **Create the page component** following naming conventions
3. **Add route definition** in appropriate route file
4. **Create controller method** if needed
5. **Add to navigation** if required
6. **Test the page** thoroughly
7. **Update documentation** if necessary

### 2. Creating a New Feature

1. **Design the data model** and create migrations
2. **Create the model** with relationships
3. **Create the repository** for data access
4. **Create the service** for business logic
5. **Create the controller** for API endpoints
6. **Create the frontend components** and pages
7. **Add routes** and navigation
8. **Write tests** for all layers
9. **Update documentation**

### 3. Code Review Checklist

- [ ] **Follows naming conventions**
- [ ] **Implements proper error handling**
- [ ] **Includes loading states**
- [ ] **Is responsive and accessible**
- [ ] **Has proper TypeScript types**
- [ ] **Includes appropriate tests**
- [ ] **Follows security best practices**
- [ ] **Is properly documented**

## Conclusion

These guidelines ensure consistency and maintainability across the entire application. When in doubt, refer to existing code patterns in the codebase and follow the established conventions. Always prioritize user experience, security, and code quality.

For questions or clarifications about these guidelines, please refer to the existing codebase examples or consult with the development team.
