<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Xendit Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for Xendit payment gateway integration.
    |
    */

    'api_key' => env('XENDIT_API_KEY'),
    'public_key' => env('XENDIT_PUBLIC_KEY'),
    'webhook_token' => env('XENDIT_WEBHOOK_TOKEN'),
    'environment' => env('XENDIT_ENVIRONMENT', 'sandbox'), // sandbox or production

    /*
    |--------------------------------------------------------------------------
    | Default Payment Methods
    |--------------------------------------------------------------------------
    |
    | Default payment methods enabled for the application.
    |
    */
    'payment_methods' => [
        'credit_card',
        'virtual_account',
        'ewallet',
        'retail_outlet',
        'qr_code',
    ],

    /*
    |--------------------------------------------------------------------------
    | Virtual Account Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for virtual account payments.
    |
    */
    'virtual_account' => [
        'banks' => [
            'BCA' => 'BCA',
            'BNI' => 'BNI',
            'BRI' => 'BRI',
            'MANDIRI' => 'MANDIRI',
            'PERMATA' => 'PERMATA',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | E-Wallet Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for e-wallet payments.
    |
    */
    'ewallet' => [
        'providers' => [
            'OVO' => 'OVO',
            'DANA' => 'DANA',
            'LINKAJA' => 'LINKAJA',
            'SHOPEEPAY' => 'SHOPEEPAY',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Retail Outlet Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for retail outlet payments.
    |
    */
    'retail_outlet' => [
        'channels' => [
            'ALFAMART' => 'ALFAMART',
            'INDOMARET' => 'INDOMARET',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Callback URLs
    |--------------------------------------------------------------------------
    |
    | URLs for payment callbacks and redirects.
    |
    */
    'callback_urls' => [
        'success' => env('XENDIT_SUCCESS_URL', '/payment/success'),
        'failure' => env('XENDIT_FAILURE_URL', '/payment/failure'),
        'webhook' => env('XENDIT_WEBHOOK_URL', '/api/payment/xendit/webhook'),
    ],
];
