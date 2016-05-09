<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectExpertsApproved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProjectExpertsApprovedNotification
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
     * @param  ProjectExpertsApproved  $event
     * @return void
     */
    public function handle(ProjectExpertsApproved $event)
    {
        //
    }
}
