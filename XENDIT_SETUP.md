# Xendit Payment Gateway Setup

This document provides instructions for setting up Xendit as a payment gateway in your Laravel application.

## Installation

The Xendit PHP SDK has been added to your `composer.json`. Run the following command to install it:

```bash
composer install
```

## Environment Configuration

Add the following environment variables to your `.env` file:

```env
# Xendit Payment Gateway Configuration
# Get your API keys from https://dashboard.xendit.co/

# Xendit API Key (Secret Key)
XENDIT_API_KEY=your_xendit_secret_key_here

# Xendit Public Key (for frontend integration)
XENDIT_PUBLIC_KEY=your_xendit_public_key_here

# Xendit Webhook Token (for webhook verification)
XENDIT_WEBHOOK_TOKEN=your_webhook_token_here

# Xendit Environment (sandbox or production)
XENDIT_ENVIRONMENT=sandbox

# Callback URLs
XENDIT_SUCCESS_URL=/payment/success
XENDIT_FAILURE_URL=/payment/failure
XENDIT_WEBHOOK_URL=/api/payment/xendit/webhook
```

## Database Migration

Run the migration to add Xendit-related columns to the payments table:

```bash
php artisan migrate
```

## Configuration

The Xendit configuration is located in `config/xendit.php`. This file contains:

- API key configuration
- Payment method settings
- Bank and e-wallet provider configurations
- Callback URL settings

## Available Payment Methods

The integration supports the following payment methods:

### 1. Invoice
- Credit Card payments
- Bank Transfer
- E-wallet payments
- Retail outlet payments

### 2. Virtual Account
- BCA
- BNI
- BRI
- Mandiri
- Permata

### 3. E-wallet
- OVO
- DANA
- LinkAja
- ShopeePay

### 4. Retail Outlet
- Alfamart
- Indomaret

## API Endpoints

### Create Payment
```
POST /api/payments
```

**Request Body:**
```json
{
    "order_id": 1,
    "payment_method": "invoice",
    "amount": 100000,
    "currency": "IDR",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+6281234567890"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Payment created successfully",
    "data": {
        "payment_id": 1,
        "payment_uuid": "uuid-here",
        "payment_url": "https://checkout.xendit.co/web/...",
        "payment_method": "invoice",
        "amount": 100000,
        "currency": "IDR"
    }
}
```

### Get Payment Status
```
GET /api/payments/{paymentUuid}/status
```

### Get Available Payment Methods
```
GET /api/payments/methods
```

### Webhook Endpoint
```
POST /api/payment/xendit/webhook
```

## Usage Examples

### Creating an Invoice Payment

```php
use App\Services\XenditService;

$xenditService = new XenditService();

$result = $xenditService->createInvoice([
    'external_id' => 'order_123_' . time(),
    'amount' => 100000,
    'description' => 'Payment for Order #123',
    'customer' => [
        'given_names' => 'John Doe',
        'email' => 'john@example.com',
        'mobile_number' => '+6281234567890',
    ],
    'success_redirect_url' => 'https://yoursite.com/payment/success',
    'failure_redirect_url' => 'https://yoursite.com/payment/failure',
]);
```

### Creating a Virtual Account Payment

```php
$result = $xenditService->createVirtualAccount([
    'external_id' => 'order_123_' . time(),
    'bank_code' => 'BCA',
    'name' => 'John Doe',
    'amount' => 100000,
]);
```

## Webhook Handling

The webhook endpoint automatically:
- Verifies the webhook signature
- Updates payment status based on Xendit callback
- Updates order status when payment is settled

## Testing

For testing, use the sandbox environment:
1. Set `XENDIT_ENVIRONMENT=sandbox` in your `.env` file
2. Use sandbox API keys from your Xendit dashboard
3. Test payments using Xendit's test card numbers

## Production Setup

For production:
1. Set `XENDIT_ENVIRONMENT=production` in your `.env` file
2. Use production API keys from your Xendit dashboard
3. Ensure webhook URLs are accessible from the internet
4. Configure proper SSL certificates

## Security Notes

- Never expose your secret API key in frontend code
- Always verify webhook signatures
- Use HTTPS for all callback URLs
- Regularly rotate your API keys

## Support

For Xendit-specific issues, refer to:
- [Xendit Documentation](https://developers.xendit.co/)
- [Xendit PHP SDK](https://github.com/xendit/xendit-php)
- [Xendit Dashboard](https://dashboard.xendit.co/)
