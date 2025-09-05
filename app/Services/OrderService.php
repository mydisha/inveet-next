<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use Illuminate\Support\Str;

class OrderService implements BaseServiceInterface
{
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function getAll(array $filters = [])
    {
        if (isset($filters['paid_only']) && $filters['paid_only']) {
            return $this->orderRepository->findPaidOrders();
        }

        if (isset($filters['pending_only']) && $filters['pending_only']) {
            return $this->orderRepository->findPendingOrders();
        }

        if (isset($filters['void_only']) && $filters['void_only']) {
            return $this->orderRepository->findVoidOrders();
        }

        return $this->orderRepository->all();
    }

    public function findById(int $id)
    {
        return $this->orderRepository->find($id);
    }

    public function findByIdWithRelations(int $id)
    {
        return $this->orderRepository->findWithRelations($id);
    }

    public function create(array $data)
    {
        // Generate invoice number if not provided
        if (!isset($data['invoice_number'])) {
            $data['invoice_number'] = $this->generateInvoiceNumber();
        }

        // Set default values
        $data['is_paid'] = $data['is_paid'] ?? false;
        $data['is_void'] = $data['is_void'] ?? false;
        $data['status'] = $data['status'] ?? 'pending';

        // Calculate total if not provided
        if (!isset($data['total_price']) && isset($data['package_id'])) {
            // You might want to inject package service here to get price
            $data['total_price'] = $data['total_price'] ?? 0;
        }

        return $this->orderRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->orderRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->orderRepository->delete($id);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->orderRepository->paginateWithRelations($perPage, $filters);
    }

    public function findByUserId(int $userId)
    {
        return $this->orderRepository->findByUserId($userId);
    }

    public function findByWeddingId(int $weddingId)
    {
        return $this->orderRepository->findByWeddingId($weddingId);
    }

    public function findByInvoiceNumber(string $invoiceNumber)
    {
        return $this->orderRepository->findByInvoiceNumber($invoiceNumber);
    }

    public function markAsPaid(int $orderId, string $externalTransactionId = null)
    {
        return $this->orderRepository->markAsPaid($orderId, $externalTransactionId);
    }

    public function markAsVoid(int $orderId)
    {
        return $this->orderRepository->markAsVoid($orderId);
    }

    public function updateStatus(int $orderId, string $status)
    {
        return $this->orderRepository->updateStatus($orderId, $status);
    }

    public function findByPackageId(int $packageId)
    {
        return $this->orderRepository->findByPackageId($packageId);
    }

    public function processPayment(int $orderId, array $paymentData)
    {
        $order = $this->findById($orderId);
        if (!$order) {
            return false;
        }

        // Update order with payment information
        $updateData = [
            'is_paid' => true,
            'paid_at' => now(),
            'status' => 'paid'
        ];

        if (isset($paymentData['external_transaction_id'])) {
            $updateData['external_transaction_id'] = $paymentData['external_transaction_id'];
        }

        if (isset($paymentData['payment_type'])) {
            $updateData['payment_type'] = $paymentData['payment_type'];
        }

        return $this->orderRepository->update($orderId, $updateData);
    }

    public function cancelOrder(int $orderId, string $reason = null)
    {
        $order = $this->findById($orderId);
        if (!$order) {
            return false;
        }

        // Only allow cancellation of unpaid orders
        if ($order->is_paid) {
            return false;
        }

        return $this->orderRepository->update($orderId, [
            'is_void' => true,
            'void_at' => now(),
            'status' => 'cancelled'
        ]);
    }

    private function generateInvoiceNumber(): string
    {
        $prefix = 'INV';
        $date = now()->format('Ymd');
        $random = Str::random(6);

        return $prefix . $date . $random;
    }
}
