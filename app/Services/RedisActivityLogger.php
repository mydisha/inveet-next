<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;

class RedisActivityLogger
{
    protected $redis;
    protected $queueKey = 'activity_logs_queue';
    protected $batchSize = 100;

    public function __construct()
    {
        $this->redis = Redis::connection();
    }

    /**
     * Push activity to Redis queue for async processing.
     */
    public function pushActivity(array $activityData): void
    {
        try {
            $this->redis->lpush($this->queueKey, json_encode($activityData));
        } catch (\Exception $e) {
            Log::error('Failed to push activity to Redis', [
                'error' => $e->getMessage(),
                'activity' => $activityData
            ]);
        }
    }

    /**
     * Process activities from Redis queue in batches.
     */
    public function processBatch(): int
    {
        $activities = [];

        // Pop multiple items from Redis list
        for ($i = 0; $i < $this->batchSize; $i++) {
            $activity = $this->redis->rpop($this->queueKey);
            if (!$activity) {
                break;
            }
            $activities[] = json_decode($activity, true);
        }

        if (empty($activities)) {
            return 0;
        }

        // Bulk insert to database
        $this->bulkInsert($activities);

        return count($activities);
    }

    /**
     * Bulk insert activities for maximum performance.
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

        // Use raw SQL for maximum performance
        \DB::table('activity_logs')->insert($insertData);
    }

    /**
     * Get queue size for monitoring.
     */
    public function getQueueSize(): int
    {
        return $this->redis->llen($this->queueKey);
    }
}
