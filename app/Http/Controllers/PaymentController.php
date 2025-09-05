<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Order;
use App\Services\XenditService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Config;

class PaymentController extends Controller
{
    protected $xenditService;

    public function __construct(XenditService $xenditService)
    {
        $this->xenditService = $xenditService;
    }

    /**
     * Create a new payment using Xendit
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createPayment(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'payment_method' => 'required|string|in:invoice,virtual_account,ewallet,retail_outlet',
            'amount' => 'required|numeric|min:1000',
            'currency' => 'string|in:IDR,USD',
            'bank_code' => 'required_if:payment_method,virtual_account|string',
            'channel_code' => 'required_if:payment_method,ewallet,retail_outlet|string',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $order = Order::findOrFail($request->order_id);

            // Create payment record
            $payment = Payment::create([
                'order_id' => $order->id,
                'payment_channel' => $request->payment_method,
                'gateway_source' => 'xendit',
                'payment_status' => 'pending',
                'transaction_type' => 'payment',
                'callback_response' => [
                    'xendit_external_id' => 'order_' . $order->id . '_' . time(),
                    'amount' => $request->amount,
                    'currency' => $request->currency ?? 'IDR',
                ],
            ]);

            // Prepare payment data based on method
            $paymentData = $this->preparePaymentData($request, $payment, $order);

            // Create payment using Xendit
            $result = $this->createXenditPayment($request->payment_method, $paymentData);

            if (!$result['success']) {
                $payment->update(['payment_status' => 'failed']);
                return response()->json([
                    'success' => false,
                    'message' => 'Payment creation failed',
                    'error' => $result['error'],
                ], 400);
            }

            // Update payment with Xendit response
            $this->updatePaymentWithXenditResponse($payment, $result['data'], $request->payment_method);

            return response()->json([
                'success' => true,
                'message' => 'Payment created successfully',
                'data' => [
                    'payment_id' => $payment->id,
                    'payment_uuid' => $payment->payment_uuid,
                    'payment_url' => $result['data']['invoice_url'] ?? $result['data']['payment_url'] ?? null,
                    'payment_method' => $request->payment_method,
                    'amount' => $request->amount,
                    'currency' => $request->currency ?? 'IDR',
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Payment creation failed', [
                'error' => $e->getMessage(),
                'request' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Payment creation failed',
                'error' => 'Internal server error',
            ], 500);
        }
    }

    /**
     * Handle Xendit webhook
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function handleWebhook(Request $request): JsonResponse
    {
        try {
            $payload = $request->getContent();
            $signature = $request->header('x-xendit-signature');

            // Verify webhook signature
            if (!$this->xenditService->verifyWebhookSignature($payload, $signature)) {
                Log::warning('Invalid Xendit webhook signature');
                return response()->json(['message' => 'Invalid signature'], 400);
            }

            $data = json_decode($payload, true);
            $externalId = $data['external_id'] ?? null;

            if (!$externalId) {
                return response()->json(['message' => 'Missing external_id'], 400);
            }

            // Find payment by external ID in callback_response
            $payment = Payment::whereJsonContains('callback_response->xendit_external_id', $externalId)->first();

            if (!$payment) {
                Log::warning('Payment not found for external_id', ['external_id' => $externalId]);
                return response()->json(['message' => 'Payment not found'], 404);
            }

            // Update payment status
            $payment->updateFromXenditCallback($data);

            // Update order status if payment is settled
            if ($payment->isSettled()) {
                $payment->order->update(['status' => 'paid']);
            }

            Log::info('Xendit webhook processed successfully', [
                'payment_id' => $payment->id,
                'external_id' => $externalId,
                'status' => $data['status'] ?? 'unknown',
            ]);

            return response()->json(['message' => 'Webhook processed successfully']);

        } catch (\Exception $e) {
            Log::error('Xendit webhook processing failed', [
                'error' => $e->getMessage(),
                'payload' => $request->getContent(),
            ]);

            return response()->json(['message' => 'Webhook processing failed'], 500);
        }
    }

    /**
     * Get payment status
     *
     * @param string $paymentUuid
     * @return JsonResponse
     */
    public function getPaymentStatus(string $paymentUuid): JsonResponse
    {
        try {
            $payment = Payment::where('payment_uuid', $paymentUuid)->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => [
                    'payment_uuid' => $payment->payment_uuid,
                    'status' => $payment->payment_status,
                    'amount' => $payment->callback_response['amount'] ?? null,
                    'currency' => $payment->callback_response['currency'] ?? null,
                    'payment_method' => $payment->payment_channel,
                    'created_at' => $payment->created_at,
                    'updated_at' => $payment->updated_at,
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }
    }

    /**
     * Get available payment methods
     *
     * @return JsonResponse
     */
    public function getPaymentMethods(): JsonResponse
    {
        $methods = $this->xenditService->getAvailablePaymentMethods();

        return response()->json([
            'success' => true,
            'data' => $methods,
        ]);
    }

    /**
     * Prepare payment data based on method
     */
    private function preparePaymentData(Request $request, Payment $payment, Order $order): array
    {
        $baseData = [
            'external_id' => $payment->callback_response['xendit_external_id'],
            'amount' => $request->amount,
            'currency' => $request->currency ?? 'IDR',
            'customer' => [
                'given_names' => $request->customer_name,
                'email' => $request->customer_email,
                'mobile_number' => $request->customer_phone,
            ],
            'description' => "Payment for Order #{$order->id}",
        ];

        switch ($request->payment_method) {
            case 'virtual_account':
                return array_merge($baseData, [
                    'bank_code' => $request->bank_code,
                    'name' => $request->customer_name,
                ]);

            case 'ewallet':
                return array_merge($baseData, [
                    'reference_id' => $payment->callback_response['xendit_external_id'],
                    'channel_code' => $request->channel_code,
                    'channel_properties' => [
                        'mobile_number' => $request->customer_phone,
                        'success_redirect_url' => Config::get('xendit.callback_urls.success'),
                        'failure_redirect_url' => Config::get('xendit.callback_urls.failure'),
                    ],
                ]);

            case 'retail_outlet':
                return array_merge($baseData, [
                    'reference_id' => $payment->callback_response['xendit_external_id'],
                    'channel_code' => $request->channel_code,
                    'customer_name' => $request->customer_name,
                ]);

            default: // invoice
                return array_merge($baseData, [
                    'items' => [
                        [
                            'name' => "Order #{$order->id}",
                            'quantity' => 1,
                            'price' => $request->amount,
                        ],
                    ],
                ]);
        }
    }

    /**
     * Create payment using appropriate Xendit method
     */
    private function createXenditPayment(string $method, array $data): array
    {
        switch ($method) {
            case 'invoice':
                return $this->xenditService->createInvoice($data);
            case 'virtual_account':
                return $this->xenditService->createVirtualAccount($data);
            case 'ewallet':
                return $this->xenditService->createEWalletCharge($data);
            case 'retail_outlet':
                return $this->xenditService->createRetailOutletPayment($data);
            default:
                return [
                    'success' => false,
                    'error' => 'Unsupported payment method',
                ];
        }
    }

    /**
     * Update payment with Xendit response
     */
    private function updatePaymentWithXenditResponse(Payment $payment, array $response, string $method): void
    {
        $callbackResponse = $payment->callback_response ?? [];

        $callbackResponse['xendit_payment_method'] = $method;

        switch ($method) {
            case 'invoice':
                $callbackResponse['xendit_invoice_id'] = $response['id'] ?? null;
                $callbackResponse['xendit_payment_url'] = $response['invoice_url'] ?? null;
                break;
            case 'virtual_account':
                $callbackResponse['xendit_payment_url'] = $response['account_number'] ?? null;
                break;
            case 'ewallet':
                $callbackResponse['xendit_payment_url'] = $response['actions']['mobile_web_checkout_url'] ?? null;
                break;
            case 'retail_outlet':
                $callbackResponse['xendit_payment_url'] = $response['payment_code'] ?? null;
                break;
        }

        $payment->update(['callback_response' => $callbackResponse]);
    }
}
