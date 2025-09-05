<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class BatchActivityLogger
{
    protected $batchSize;
    protected $cacheKey = 'activity_log_batch';
    protected $maxWaitTime = 60; // seconds

    public function __construct(int $batchSize = 100)
    {
        $this->batchSize = $batchSize;
    }

    /**
     * Add activity to batch for later processing.
     */
    public function addToBatch(array $activityData): void
    {
        $batch = Cache::get($this->cacheKey, []);
        $batch[] = $activityData;

        // If batch is full, process it immediately
        if (count($batch) >= $this->batchSize) {
            $this->processBatch();
        } else {
            // Store batch with expiration
            Cache::put($this->cacheKey, $batch, $this->maxWaitTime);
        }
    }

    /**
     * Process the current batch.
     */
    public function processBatch(): void
    {
        $batch = Cache::pull($this->cacheKey, []);

        if (empty($batch)) {
            return;
        }

        try {
            // Use bulk insert for better performance
            $this->bulkInsert($batch);
        } catch (\Exception $e) {
            Log::error('Failed to process activity log batch', [
                'error' => $e->getMessage(),
                'batch_size' => count($batch)
            ]);
        }
    }

    /**
     * Bulk insert activities for better performance.
     */
    protected function bulkInsert(array $activities): void
    {
        $now = now();
        $insertData = [];

        foreach ($activities as $activity) {
            $insertData[] = array_merge($activity, [
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Use chunked inserts for very large batches
        $chunks = array_chunk($insertData, 1000);
        foreach ($chunks as $chunk) {
            ActivityLog::insert($chunk);
        }
    }

    /**
     * Force process any remaining batch items.
     */
    public function flush(): void
    {
        $this->processBatch();
    }
}
