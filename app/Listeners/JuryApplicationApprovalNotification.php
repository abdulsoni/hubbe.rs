<?php

namespace Fundator\Listeners;

use Fundator\Events\JuryApplicationApproval;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class JuryApplicationApprovalNotification
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
     * @param  JuryApplicationApproval  $event
     * @return void
     */
    public function handle(JuryApplicationApproval $event)
    {
        //
    }
}
