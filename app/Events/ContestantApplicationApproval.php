<?php

namespace Fundator\Events;

use Fundator\ContestantApplication;

use Fundator\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ContestantApplicationApproval extends Event
{
    use SerializesModels;

    public $contestantApplication;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ContestantApplication $contestantApplication)
    {
        $this->contestantApplication = $contestantApplication;
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
