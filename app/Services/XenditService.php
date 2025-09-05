<?php

namespace App\Services;

use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\VirtualAccount\VirtualAccountApi;
use Xendit\VirtualAccount\CreateVirtualAccountRequest;
use Xendit\EWallet\EWalletApi;
use Xendit\EWallet\CreateEWalletChargeRequest;
use Xendit\RetailOutlet\RetailOutletApi;
use Xendit\RetailOutlet\CreateFixedPaymentCodeRequest;
use Xendit\Exceptions\ApiException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class XenditService
{
    protected $invoiceApi;
    protected $virtualAccountApi;
    protected $eWalletApi;
    protected $retailOutletApi;

    public function __construct()
    {
        // Set Xendit API key
        Configuration::setXenditKey(Config::get('xendit.api_key'));

        // Initialize API clients
        $this->invoiceApi = new InvoiceApi();
        $this->virtualAccountApi = new VirtualAccountApi();
        $this->eWalletApi = new EWalletApi();
        $this->retailOutletApi = new RetailOutletApi();
    }

    /**
     * Create an invoice for payment
     *
     * @param array $data
     * @return array
     */
    public function createInvoice(array $data): array
    {
        try {
            $createInvoiceRequest = new CreateInvoiceRequest([
                'external_id' => $data['external_id'],
                'amount' => $data['amount'],
                'description' => $data['description'],
                'invoice_duration' => $data['invoice_duration'] ?? 86400, // 24 hours default
                'customer' => $data['customer'] ?? null,
                'success_redirect_url' => Config::get('xendit.callback_urls.success'),
                'failure_redirect_url' => Config::get('xendit.callback_urls.failure'),
                'payment_methods' => $data['payment_methods'] ?? Config::get('xendit.payment_methods'),
                'currency' => $data['currency'] ?? 'IDR',
                'items' => $data['items'] ?? [],
                'fees' => $data['fees'] ?? [],
            ]);

            $response = $this->invoiceApi->createInvoice($createInvoiceRequest);

            return [
                'success' => true,
                'data' => $response,
                'invoice_url' => $response['invoice_url'] ?? null,
                'invoice_id' => $response['id'] ?? null,
            ];
        } catch (ApiException $e) {
            Log::error('Xendit Invoice Creation Failed', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => null,
            ];
        }
    }

    /**
     * Create a virtual account for payment
     *
     * @param array $data
     * @return array
     */
    public function createVirtualAccount(array $data): array
    {
        try {
            $createVaRequest = new CreateVirtualAccountRequest([
                'external_id' => $data['external_id'],
                'bank_code' => $data['bank_code'],
                'name' => $data['name'],
                'virtual_account_number' => $data['virtual_account_number'] ?? null,
                'suggested_amount' => $data['amount'] ?? null,
                'is_closed' => $data['is_closed'] ?? true,
                'expected_amount' => $data['amount'] ?? null,
                'expiration_date' => $data['expiration_date'] ?? null,
                'is_single_use' => $data['is_single_use'] ?? true,
            ]);

            $response = $this->virtualAccountApi->createVirtualAccount($createVaRequest);

            return [
                'success' => true,
                'data' => $response,
                'virtual_account_number' => $response['account_number'] ?? null,
            ];
        } catch (ApiException $e) {
            Log::error('Xendit Virtual Account Creation Failed', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => null,
            ];
        }
    }

    /**
     * Create an e-wallet charge
     *
     * @param array $data
     * @return array
     */
    public function createEWalletCharge(array $data): array
    {
        try {
            $createChargeRequest = new CreateEWalletChargeRequest([
                'reference_id' => $data['reference_id'],
                'currency' => $data['currency'] ?? 'IDR',
                'amount' => $data['amount'],
                'checkout_method' => $data['checkout_method'] ?? 'ONE_TIME_PAYMENT',
                'channel_code' => $data['channel_code'],
                'channel_properties' => $data['channel_properties'] ?? [],
                'customer' => $data['customer'] ?? null,
                'basket' => $data['basket'] ?? [],
                'metadata' => $data['metadata'] ?? [],
            ]);

            $response = $this->eWalletApi->createEWalletCharge($createChargeRequest);

            return [
                'success' => true,
                'data' => $response,
            ];
        } catch (ApiException $e) {
            Log::error('Xendit E-Wallet Charge Creation Failed', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => null,
            ];
        }
    }

    /**
     * Create a retail outlet payment code
     *
     * @param array $data
     * @return array
     */
    public function createRetailOutletPayment(array $data): array
    {
        try {
            $createPaymentCodeRequest = new CreateFixedPaymentCodeRequest([
                'reference_id' => $data['reference_id'],
                'channel_code' => $data['channel_code'],
                'customer_name' => $data['customer_name'],
                'amount' => $data['amount'],
                'currency' => $data['currency'] ?? 'IDR',
                'market' => $data['market'] ?? 'ID',
                'payment_code' => $data['payment_code'] ?? null,
                'expires_at' => $data['expires_at'] ?? null,
                'is_single_use' => $data['is_single_use'] ?? true,
                'description' => $data['description'] ?? null,
            ]);

            $response = $this->retailOutletApi->createFixedPaymentCode($createPaymentCodeRequest);

            return [
                'success' => true,
                'data' => $response,
                'payment_code' => $response['payment_code'] ?? null,
            ];
        } catch (ApiException $e) {
            Log::error('Xendit Retail Outlet Payment Creation Failed', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => null,
            ];
        }
    }

    /**
     * Get invoice by ID
     *
     * @param string $invoiceId
     * @return array
     */
    public function getInvoice(string $invoiceId): array
    {
        try {
            $response = $this->invoiceApi->getInvoiceById($invoiceId);

            return [
                'success' => true,
                'data' => $response,
            ];
        } catch (ApiException $e) {
            Log::error('Xendit Get Invoice Failed', [
                'error' => $e->getMessage(),
                'invoice_id' => $invoiceId,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => null,
            ];
        }
    }

    /**
     * Expire an invoice
     *
     * @param string $invoiceId
     * @return array
     */
    public function expireInvoice(string $invoiceId): array
    {
        try {
            $response = $this->invoiceApi->expireInvoice($invoiceId);

            return [
                'success' => true,
                'data' => $response,
            ];
        } catch (ApiException $e) {
            Log::error('Xendit Expire Invoice Failed', [
                'error' => $e->getMessage(),
                'invoice_id' => $invoiceId,
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => null,
            ];
        }
    }

    /**
     * Verify webhook signature
     *
     * @param string $payload
     * @param string $signature
     * @return bool
     */
    public function verifyWebhookSignature(string $payload, string $signature): bool
    {
        $expectedSignature = hash_hmac('sha256', $payload, Config::get('xendit.webhook_token'));
        return hash_equals($expectedSignature, $signature);
    }

    /**
     * Get available payment methods
     *
     * @return array
     */
    public function getAvailablePaymentMethods(): array
    {
        return [
            'virtual_account' => Config::get('xendit.virtual_account.banks'),
            'ewallet' => Config::get('xendit.ewallet.providers'),
            'retail_outlet' => Config::get('xendit.retail_outlet.channels'),
        ];
    }
}
