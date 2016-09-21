<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectExpertiseApproved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProjectExpertiseApprovedNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(){
        //
    }

    /**
     * Handle the event.
     *
     * @param  ProjectExpertiseApproved  $event
     * @return void
     */
    public function handle(ProjectExpertiseApproved $event){
        //
    }
}
