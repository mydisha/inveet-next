<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\StoreOrderRequest;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['paid_only', 'pending_only', 'void_only']);
        $orders = $this->orderService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Orders retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = $this->orderService->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $order = $this->orderService->findById($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'status' => 'sometimes|string|max:255',
            'payment_type' => 'sometimes|string|max:255',
            'payment_url' => 'sometimes|nullable|string|max:500',
        ]);

        $order = $this->orderService->update($id, $request->validated());

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->orderService->delete($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order deleted successfully'
        ]);
    }

    /**
     * Get orders by user ID
     */
    public function findByUserId(int $userId): JsonResponse
    {
        $orders = $this->orderService->findByUserId($userId);

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'User orders retrieved successfully'
        ]);
    }

    /**
     * Get orders by wedding ID
     */
    public function findByWeddingId(int $weddingId): JsonResponse
    {
        $orders = $this->orderService->findByWeddingId($weddingId);

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Wedding orders retrieved successfully'
        ]);
    }

    /**
     * Get order by invoice number
     */
    public function findByInvoiceNumber(string $invoiceNumber): JsonResponse
    {
        $order = $this->orderService->findByInvoiceNumber($invoiceNumber);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order retrieved successfully'
        ]);
    }

    /**
     * Mark order as paid
     */
    public function markAsPaid(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'external_transaction_id' => 'sometimes|string|max:255'
        ]);

        $marked = $this->orderService->markAsPaid($id, $request->only('external_transaction_id'));

        if (!$marked) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order marked as paid successfully'
        ]);
    }

    /**
     * Mark order as void
     */
    public function markAsVoid(int $id): JsonResponse
    {
        $marked = $this->orderService->markAsVoid($id);

        if (!$marked) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order marked as void successfully'
        ]);
    }

    /**
     * Update order status
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|max:255'
        ]);

        $updated = $this->orderService->updateStatus($id, $request->status);

        if (!$updated) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully'
        ]);
    }

    /**
     * Get orders by package ID
     */
    public function findByPackageId(int $packageId): JsonResponse
    {
        $orders = $this->orderService->findByPackageId($packageId);

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Package orders retrieved successfully'
        ]);
    }

    /**
     * Process payment for an order
     */
    public function processPayment(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'external_transaction_id' => 'sometimes|string|max:255',
            'payment_type' => 'sometimes|string|max:255'
        ]);

        $processed = $this->orderService->processPayment($id, $request->only([
            'external_transaction_id', 'payment_type'
        ]));

        if (!$processed) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found or cannot be processed'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => 'Payment processed successfully'
        ]);
    }

    /**
     * Cancel an order
     */
    public function cancel(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'reason' => 'sometimes|string|max:500'
        ]);

        $cancelled = $this->orderService->cancelOrder($id, $request->validated()['reason'] ?? null);

        if (!$cancelled) {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be cancelled'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully'
        ]);
    }
}
