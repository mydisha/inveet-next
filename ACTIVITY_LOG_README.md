# Activity Log System

This system provides comprehensive activity logging for both customers and administrators, allowing you to track all user actions and system events.

## Features

- **Automatic Logging**: Models automatically log create, update, delete, and restore events
- **Custom Logging**: Log custom activities with detailed information
- **User Tracking**: Track activities by specific users
- **Model Tracking**: Track activities for specific models
- **Search & Filter**: Advanced search and filtering capabilities
- **Statistics**: Get activity statistics and insights
- **Lightweight**: Minimal performance impact with efficient database design

## Database Structure

The `activity_logs` table includes:
- `log_name`: Category of the activity (e.g., 'user', 'wedding', 'order')
- `event`: Type of event (e.g., 'created', 'updated', 'deleted', 'login')
- `subject_type` & `subject_id`: The model that was affected
- `causer_type` & `causer_id`: The user who performed the action
- `properties`: JSON data with additional information
- `description`: Human-readable description
- `ip_address`, `user_agent`, `url`, `method`: Request context
- `created_at`, `updated_at`: Timestamps

## Usage

### Automatic Logging

Models that use the `LogsActivity` trait automatically log activities:

```php
use App\Traits\LogsActivity;

class User extends Model
{
    use LogsActivity;
    // ... rest of your model
}
```

### Custom Logging

Use the `ActivityLogService` for custom activities:

```php
use App\Services\ActivityLogService;

$activityLogService = new ActivityLogService();

// Log a custom activity
$activityLogService->log(
    'wedding',
    'published',
    $wedding,
    ['custom_data' => 'value'],
    'Wedding was published',
    $user
);

// Log user login
$activityLogService->logLogin($user, 'email');

// Log user logout
$activityLogService->logLogout($user);

// Log admin actions
$activityLogService->logAdminAction('activate', $user);
```

### Querying Activities

```php
use App\Models\ActivityLog;

// Get all activities for a user
$activities = ActivityLog::forCauser($user)->get();

// Get all activities for a model
$activities = ActivityLog::forSubject($wedding)->get();

// Search activities
$activities = ActivityLog::where('log_name', 'user')
    ->where('event', 'created')
    ->get();

// Get activities in date range
$activities = ActivityLog::inDateRange($startDate, $endDate)->get();
```

## API Endpoints

### Backoffice Activity Logs

- `GET /api/backoffice/activity-logs` - List all activities with filters
- `GET /api/backoffice/activity-logs/filters` - Get available filter options
- `GET /api/backoffice/activity-logs/statistics` - Get activity statistics
- `GET /api/backoffice/activity-logs/user/{userId}` - Get user activities
- `GET /api/backoffice/activity-logs/model/{modelType}/{modelId}` - Get model activities
- `GET /api/backoffice/activity-logs/{id}` - Get specific activity

### Query Parameters

- `log_name`: Filter by log name (e.g., 'user', 'wedding', 'order')
- `event`: Filter by event type (e.g., 'created', 'updated', 'deleted')
- `causer_id`: Filter by user ID
- `subject_type`: Filter by model type
- `subject_id`: Filter by model ID
- `date_from`: Filter from date
- `date_to`: Filter to date
- `search`: Search in description, log_name, or event
- `per_page`: Number of results per page (default: 50)

## Frontend Component

The `ActivityLogs.tsx` component provides a complete interface for viewing and filtering activities:

- Real-time search and filtering
- Activity statistics
- User and model activity views
- Responsive design with modern UI

## Models with Activity Logging

The following models automatically log activities:
- `User` - User management activities
- `Wedding` - Wedding-related activities
- `Order` - Order and payment activities
- `Package` - Package management activities

## Performance Considerations

- The system uses database indexes for efficient querying
- Activities are logged asynchronously to minimize performance impact
- Consider implementing log rotation for high-traffic applications
- Use the search and filter capabilities to limit result sets

## Security

- IP addresses and user agents are logged for security auditing
- Sensitive data should not be included in the `properties` field
- Consider implementing log retention policies
- Access to activity logs should be restricted to authorized users

## Testing

Run the activity log tests:

```bash
php artisan test tests/Feature/ActivityLogTest.php
```

## Examples

### Logging a Wedding Publication

```php
$activityLogService = new ActivityLogService();
$activityLogService->logWeddingPublication($wedding, $user);
```

### Logging an Order Payment

```php
$activityLogService = new ActivityLogService();
$activityLogService->logOrderPayment($order, $user, [
    'payment_method' => 'credit_card',
    'transaction_id' => 'txn_123456'
]);
```

### Getting User Activity Summary

```php
$activities = $activityLogService->getUserActivities($user, 100);
$stats = $activityLogService->getActivityStats('30 days');
```

This system provides comprehensive activity tracking while maintaining performance and ease of use.
