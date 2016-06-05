<?php

namespace Fundator\Events;

use Fundator\Contest;
use Fundator\Entry;

use Fundator\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ContestNewEntry extends Event
{
    use SerializesModels;

    public $contest;
    public $entry;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Contest $contest, Entry $entry)
    {
        $this->contest = $contest;
        $this->entry = $entry;
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
