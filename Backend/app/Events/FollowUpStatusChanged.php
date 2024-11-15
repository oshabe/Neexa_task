<?php

namespace App\Events;

use App\Models\FollowUp;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class FollowUpStatusChanged
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $followUp;

    /**
     * Create a new event instance.
     */
    public function __construct(FollowUp $followUp)
    {
        $this->followUp = $followUp;
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}