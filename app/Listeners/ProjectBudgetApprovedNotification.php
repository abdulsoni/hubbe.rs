<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectBudgetApproved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProjectBudgetApprovedNotification
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
     * @param  ProjectBudgetApproved  $event
     * @return void
     */
    public function handle(ProjectBudgetApproved $event)
    {
        //
    }
}
