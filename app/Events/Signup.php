<?php

namespace Fundator\Events;

use Fundator\Events\Event;
use Fundator\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class Signup extends Event
{
    use SerializesModels;

    public $user;

    /**
     * Create a new event instance
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
