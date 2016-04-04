<?php

namespace Fundator\Events;

use Fundator\Events\Event;
use Fundator\Project;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProjectApproved extends Event
{
    use SerializesModels;

    public $project;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($project)
    {
        $this->project = $project;
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
