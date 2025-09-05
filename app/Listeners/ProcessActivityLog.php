<?php

namespace App\Listeners;

use App\Events\ActivityLogged;
use App\Jobs\LogActivityJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ProcessActivityLog implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     */
    public function handle(ActivityLogged $event): void
    {
        // Process the activity log asynchronously
        LogActivityJob::dispatch(
            $event->activityData['log_name'],
            $event->activityData['event'],
            $event->activityData['subject_type'],
            $event->activityData['subject_id'],
            $event->activityData['causer_type'],
            $event->activityData['causer_id'],
            $event->activityData['properties'],
            $event->activityData['description'],
            $event->activityData['ip_address'],
            $event->activityData['user_agent'],
            $event->activityData['url'],
            $event->activityData['method']
        );
    }
}
