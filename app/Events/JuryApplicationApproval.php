<?php

namespace Fundator\Events;

use Fundator\JuryApplication;

use Fundator\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class JuryApplicationApproval extends Event
{
    use SerializesModels;

    public $juryApplication;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->juryApplication = $juryApplication;
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
