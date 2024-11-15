<?php

namespace App\Jobs;

use App\Models\FollowUp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class MarkMissedFollowUps implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        // Find all follow-ups that are overdue and not yet marked as "Missed"
        $overdueFollowUps = FollowUp::where('status', '!=', 'Missed')
            ->where('scheduled_at', '<', Carbon::now())
            ->get();

        // Update each follow-up status to "Missed"
        foreach ($overdueFollowUps as $followUp) {
            $followUp->status = 'Missed';
            $followUp->save();
        }
    }
}
