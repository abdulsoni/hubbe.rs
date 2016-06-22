<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectFinanceApproved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProjectFinanceApprovedNotification
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
     * @param  ProjectFinanceApproved  $event
     * @return void
     */
    public function handle(ProjectFinanceApproved $event)
    {
        //
    }
}
