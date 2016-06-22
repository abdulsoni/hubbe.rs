<?php

namespace Fundator\Listeners;

use Fundator\Events\ContestEntryReviewed;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContestEntryReviewedNotification
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
     * @param  ContestEntryReviewed  $event
     * @return void
     */
    public function handle(ContestEntryReviewed $event)
    {
        //
    }
}
