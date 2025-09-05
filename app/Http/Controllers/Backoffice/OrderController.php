<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['user', 'package', 'wedding.theme'])
            ->where(function ($q) {
                $q->where('payment_type', '!=', 'promo')
                  ->where('payment_type', '!=', 'free')
                  ->where('total_price', '>', 0);
            });

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhere('external_transaction_id', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $status = $request->get('status');
            switch ($status) {
                case 'paid':
                    $query->where('is_paid', true);
                    break;
                case 'pending':
                    $query->where('is_paid', false)->where('is_void', false);
                    break;
                case 'void':
                    $query->where('is_void', true);
                    break;
                case 'expired':
                    $query->where('expired_at', '<', now());
                    break;
            }
        }

        // Filter by payment type
        if ($request->has('payment_type')) {
            $query->where('payment_type', $request->get('payment_type'));
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }
        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }

        // Filter by price range
        if ($request->has('price_min')) {
            $query->where('total_price', '>=', $request->get('price_min'));
        }
        if ($request->has('price_max')) {
            $query->where('total_price', '<=', $request->get('price_max'));
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $orders = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order): JsonResponse
    {
        $order->load(['user', 'package', 'wedding.theme', 'payments']);

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    /**
     * Update the specified order.
     */
    public function update(Request $request, Order $order): JsonResponse
    {
        $request->validate([
            'status' => 'sometimes|string|in:pending,processing,completed,cancelled',
            'is_paid' => 'sometimes|boolean',
            'is_void' => 'sometimes|boolean',
            'external_transaction_id' => 'sometimes|nullable|string|max:255'
        ]);

        $order->update($request->only(['status', 'external_transaction_id']));

        // Handle payment status
        if ($request->has('is_paid') && $request->get('is_paid')) {
            $order->markAsPaid($request->get('external_transaction_id'));
        }

        // Handle void status
        if ($request->has('is_void') && $request->get('is_void')) {
            $order->markAsVoid();
        }

        $order->load(['user', 'package', 'wedding.theme']);

        return response()->json([
            'success' => true,
            'message' => 'Order updated successfully',
            'data' => $order
        ]);
    }

    /**
     * Mark order as paid.
     */
    public function markAsPaid(Request $request, Order $order): JsonResponse
    {
        $request->validate([
            'external_transaction_id' => 'nullable|string|max:255'
        ]);

        $order->markAsPaid($request->get('external_transaction_id'));

        return response()->json([
            'success' => true,
            'message' => 'Order marked as paid successfully',
            'data' => $order->load(['user', 'package', 'wedding.theme'])
        ]);
    }

    /**
     * Mark order as void.
     */
    public function markAsVoid(Order $order): JsonResponse
    {
        $order->markAsVoid();

        return response()->json([
            'success' => true,
            'message' => 'Order marked as void successfully',
            'data' => $order->load(['user', 'package', 'wedding.theme'])
        ]);
    }

    /**
     * Get order statistics.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_orders' => Order::where(function ($q) {
                $q->where('payment_type', '!=', 'promo')
                  ->where('payment_type', '!=', 'free')
                  ->where('total_price', '>', 0);
            })->count(),
            'paid_orders' => Order::where('is_paid', true)
                ->where(function ($q) {
                    $q->where('payment_type', '!=', 'promo')
                      ->where('payment_type', '!=', 'free')
                      ->where('total_price', '>', 0);
                })->count(),
            'pending_orders' => Order::where('is_paid', false)->where('is_void', false)
                ->where(function ($q) {
                    $q->where('payment_type', '!=', 'promo')
                      ->where('payment_type', '!=', 'free')
                      ->where('total_price', '>', 0);
                })->count(),
            'void_orders' => Order::where('is_void', true)
                ->where(function ($q) {
                    $q->where('payment_type', '!=', 'promo')
                      ->where('payment_type', '!=', 'free')
                      ->where('total_price', '>', 0);
                })->count(),
            'total_revenue' => Order::where(function ($q) {
                    $q->where('payment_type', '!=', 'promo')
                      ->where('payment_type', '!=', 'free')
                      ->where('total_price', '>', 0);
                })
                ->sum('total_price'),
            'unique_revenue' => Order::where(function ($q) {
                    $q->where('payment_type', '!=', 'promo')
                      ->where('payment_type', '!=', 'free')
                      ->where('total_price', '>', 0);
                })
                ->sum('total_price'),
            'orders_this_month' => Order::whereMonth('created_at', now()->month)
                ->where(function ($q) {
                    $q->where('payment_type', '!=', 'promo')
                      ->where('payment_type', '!=', 'free')
                      ->where('total_price', '>', 0);
                })->count(),
            'revenue_this_month' => Order::where(function ($q) {
                    $q->where('payment_type', '!=', 'promo')
                      ->where('payment_type', '!=', 'free')
                      ->where('total_price', '>', 0);
                })
                ->whereMonth('created_at', now()->month)
                ->sum('total_price'),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
