<?php

namespace App\Http\Controllers;

use App\Services\XenditService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestXenditController extends Controller
{
    protected $xenditService;

    public function __construct(XenditService $xenditService)
    {
        $this->xenditService = $xenditService;
    }

    /**
     * Test Xendit connection and get available payment methods
     */
    public function testConnection(): JsonResponse
    {
        try {
            $paymentMethods = $this->xenditService->getAvailablePaymentMethods();

            return response()->json([
                'success' => true,
                'message' => 'Xendit connection successful',
                'data' => [
                    'payment_methods' => $paymentMethods,
                    'environment' => config('xendit.environment'),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Xendit connection failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Test creating a simple invoice
     */
    public function testInvoice(Request $request): JsonResponse
    {
        try {
            $data = [
                'external_id' => 'test_' . time(),
                'amount' => 10000, // 100 IDR for testing
                'description' => 'Test payment from Inveet',
                'customer' => [
                    'given_names' => 'Test User',
                    'email' => 'test@example.com',
                    'mobile_number' => '+6281234567890',
                ],
            ];

            $result = $this->xenditService->createInvoice($data);

            return response()->json([
                'success' => $result['success'],
                'message' => $result['success'] ? 'Test invoice created successfully' : 'Test invoice creation failed',
                'data' => $result,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Test invoice creation failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
