<?php

namespace Fundator\Listeners;

use Fundator\Events\ContestNewEntry;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContestNewEntryNotification
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
     * @param  ContestNewEntry  $event
     * @return void
     */
    public function handle(ContestNewEntry $event)
    {
        //
    }
}
