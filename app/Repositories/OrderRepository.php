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

    /**
     * Paginate orders with relationships for backoffice
     */
    public function paginateWithRelations(int $perPage = 15, array $filters = [])
    {
        $query = $this->model->with(['user:id,name,email', 'package:id,name', 'wedding:id,slug'])
            ->orderBy('created_at', 'desc');

        // Apply filters
        if (isset($filters['search']) && !empty($filters['search'])) {
            $searchTerm = $filters['search'];
            $query->where(function ($q) use ($searchTerm) {
                $q->where('id', 'like', "%{$searchTerm}%")
                  ->orWhere('invoice_number', 'like', "%{$searchTerm}%")
                  ->orWhereHas('user', function ($userQuery) use ($searchTerm) {
                      $userQuery->where('name', 'like', "%{$searchTerm}%")
                               ->orWhere('email', 'like', "%{$searchTerm}%");
                  })
                  ->orWhereHas('package', function ($packageQuery) use ($searchTerm) {
                      $packageQuery->where('name', 'like', "%{$searchTerm}%");
                  })
                  ->orWhereHas('wedding', function ($weddingQuery) use ($searchTerm) {
                      $weddingQuery->where('title', 'like', "%{$searchTerm}%");
                  });
            });
        }

        if (isset($filters['status']) && $filters['status'] !== 'all') {
            switch ($filters['status']) {
                case 'paid':
                    $query->where('is_paid', true);
                    break;
                case 'pending':
                    $query->where('is_paid', false)->where('is_void', false);
                    break;
                case 'void':
                    $query->where('is_void', true);
                    break;
            }
        }

        if (isset($filters['payment_type']) && $filters['payment_type'] !== 'all') {
            $query->where('payment_type', $filters['payment_type']);
        }

        if (isset($filters['date_from']) && !empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to']) && !empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        return $query->paginate($perPage);
    }

    /**
     * Find order with relationships
     */
    public function findWithRelations(int $id)
    {
        return $this->model->with([
            'user:id,name,email',
            'package:id,name',
            'wedding:id,slug,theme_id',
            'wedding.theme:id,name'
        ])->find($id);
    }
}
