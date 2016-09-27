<?php

namespace Fundator\Events;

use Fundator\Events\Event;
use Illuminate\Queue\SerializesModels;
use Fundator\User;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProfileUpdated extends Event
{
    use SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user){
        $this->user = $user;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
