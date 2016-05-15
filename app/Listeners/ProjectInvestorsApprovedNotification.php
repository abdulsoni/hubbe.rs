<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectInvestorsApproved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProjectInvestorsApprovedNotification
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
     * @param  ProjectInvestorsApproved  $event
     * @return void
     */
    public function handle(ProjectInvestorsApproved $event)
    {
        //
    }
}
