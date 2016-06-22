<?php

namespace Fundator\Events;

use Fundator\Events\Event;
use Fundator\Project;
use Fundator\Expert;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProjectSuperExpertSelected extends Event
{
    use SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Project $project, Expert $superExpert)
    {
        $this->project = $project;
        $this->superExpert = $superExpert;
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
