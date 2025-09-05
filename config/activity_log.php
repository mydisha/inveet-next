<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Activity Log Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the configuration options for the activity logging
    | system. You can adjust these settings based on your performance needs.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Enable Activity Logging
    |--------------------------------------------------------------------------
    |
    | Set to false to completely disable activity logging.
    | Useful for debugging or when experiencing performance issues.
    |
    */
    'enabled' => env('ACTIVITY_LOG_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Logging Method
    |--------------------------------------------------------------------------
    |
    | Choose how activities should be logged:
    | - 'sync': Synchronous logging (immediate database write)
    | - 'queue': Asynchronous logging using Laravel queues
    | - 'redis': High-performance logging using Redis
    | - 'batch': Batch processing for high-volume scenarios
    |
    */
    'method' => env('ACTIVITY_LOG_METHOD', 'queue'),

    /*
    |--------------------------------------------------------------------------
    | Queue Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for queue-based logging.
    |
    */
    'queue' => [
        'connection' => env('ACTIVITY_LOG_QUEUE_CONNECTION', 'default'),
        'queue' => env('ACTIVITY_LOG_QUEUE_NAME', 'activity-logs'),
        'retry_after' => env('ACTIVITY_LOG_RETRY_AFTER', 90),
        'tries' => env('ACTIVITY_LOG_TRIES', 3),
    ],

    /*
    |--------------------------------------------------------------------------
    | Batch Processing Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for batch processing of activity logs.
    |
    */
    'batch' => [
        'size' => env('ACTIVITY_LOG_BATCH_SIZE', 100),
        'max_wait_time' => env('ACTIVITY_LOG_MAX_WAIT_TIME', 60), // seconds
        'cache_key' => 'activity_log_batch',
    ],

    /*
    |--------------------------------------------------------------------------
    | Redis Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for Redis-based high-performance logging.
    |
    */
    'redis' => [
        'connection' => env('ACTIVITY_LOG_REDIS_CONNECTION', 'default'),
        'queue_key' => 'activity_logs_queue',
        'batch_size' => env('ACTIVITY_LOG_REDIS_BATCH_SIZE', 100),
    ],

    /*
    |--------------------------------------------------------------------------
    | Performance Settings
    |--------------------------------------------------------------------------
    |
    | Settings to optimize performance based on your needs.
    |
    */
    'performance' => [
        // Skip logging for certain events to reduce overhead
        'skip_events' => [
            'retrieved', // Skip read operations by default
        ],

        // Skip logging for certain models
        'skip_models' => [
            // Add model classes to skip
        ],

        // Only log specific events for certain models
        'model_events' => [
            // 'App\Models\User' => ['created', 'updated', 'deleted'],
        ],

        // Rate limiting (activities per minute per user)
        'rate_limit' => [
            'enabled' => env('ACTIVITY_LOG_RATE_LIMIT', false),
            'max_activities' => env('ACTIVITY_LOG_RATE_LIMIT_MAX', 1000),
            'decay_minutes' => env('ACTIVITY_LOG_RATE_LIMIT_DECAY', 1),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Monitoring
    |--------------------------------------------------------------------------
    |
    | Configuration for monitoring the activity logging system.
    |
    */
    'monitoring' => [
        'enabled' => env('ACTIVITY_LOG_MONITORING', true),
        'metrics_interval' => env('ACTIVITY_LOG_METRICS_INTERVAL', 60), // seconds
        'alert_threshold' => env('ACTIVITY_LOG_ALERT_THRESHOLD', 10000), // activities per hour
    ],
];
