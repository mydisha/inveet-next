<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository extends BaseRepository
{
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }

    public function findByUserId(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }

    public function findByWeddingId(int $weddingId)
    {
        return $this->model->where('wedding_id', $weddingId)->get();
    }

    public function findByInvoiceNumber(string $invoiceNumber)
    {
        return $this->model->where('invoice_number', $invoiceNumber)->first();
    }

    public function findPaidOrders()
    {
        return $this->model->where('is_paid', true)->get();
    }

    public function findPendingOrders()
    {
        return $this->model->where('is_paid', false)
                          ->where('is_void', false)
                          ->get();
    }

    public function findVoidOrders()
    {
        return $this->model->where('is_void', true)->get();
    }

    public function markAsPaid(int $orderId, string $externalTransactionId = null)
    {
        $data = [
            'is_paid' => true,
            'paid_at' => now()
        ];

        if ($externalTransactionId) {
            $data['external_transaction_id'] = $externalTransactionId;
        }

        return $this->update($orderId, $data);
    }

    public function markAsVoid(int $orderId)
    {
        return $this->update($orderId, [
            'is_void' => true,
            'void_at' => now()
        ]);
    }

    public function updateStatus(int $orderId, string $status)
    {
        return $this->update($orderId, [
            'status' => $status,
            'last_checked_at' => now()
        ]);
    }

    public function findByPackageId(int $packageId)
    {
        return $this->model->where('package_id', $packageId)->get();
    }
}
