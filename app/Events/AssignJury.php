<?php

namespace Fundator\Events;

use Fundator\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AssignJury extends Event
{
    use SerializesModels;

    public $contest;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($contest, $user)
    {
        $this->contest = $contest;
        $this->user = $user;
    }
}
