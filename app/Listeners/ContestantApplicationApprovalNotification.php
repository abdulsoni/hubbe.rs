<?php

namespace Fundator\Listeners;

use Fundator\Events\ContestantApplicationApproval;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContestantApplicationApprovalNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ContestantApplicationApproval  $event
     * @return void
     */
    public function handle(ContestantApplicationApproval $event)
    {
        //
    }
}
