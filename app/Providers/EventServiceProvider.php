<?php

namespace Fundator\Providers;

use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Log;


class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'Fundator\Events\Register' => [
            'Fundator\Listeners\SendRegistrationNotification',
        ],
        'Fundator\Events\AssignJury' => [
            'Fundator\Listeners\SendJuryInvitationNotification',
        ],
    ];

    /**
     * Register any other events for your application.
     *
     * @param  \Illuminate\Contracts\Events\Dispatcher  $events
     * @return void
     */
    public function boot(DispatcherContract $events)
    {
        parent::boot($events);

        Pivot::updated(function($pivot) {
            Log::info('detected ...');
            Log::info('table ' . $pivot->getTable());

            if ($pivot->getTable() == 'contest_jury') {
                //do your stuff
                //ugly hack to get current parent model
                $parent = $pivot->offsetGet('parent')->touch();


                Log::info($parent);
            }
        });
    }
}
