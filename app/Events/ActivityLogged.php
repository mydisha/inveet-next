<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ActivityLogged
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $activityData;

    /**
     * Create a new event instance.
     */
    public function __construct(array $activityData)
    {
        $this->activityData = $activityData;
    }
}
