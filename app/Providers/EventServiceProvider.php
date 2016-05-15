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
            'Fundator\Listeners\SendRegistrationNotification'
        ],
        'Fundator\Events\AssignJury' => [
            'Fundator\Listeners\SendJuryInvitationNotification'
        ],
        'Fundator\Events\Signup' => [
            'Fundator\Listeners\SendEmailVerification'
        ],
        'Fundator\Events\ProjectApproved' => [
            'Fundator\Listeners\SendProjectApprovalNotification'
        ],
        'Fundator\Events\ProjectBidSuperExpert' => [
            'Fundator\Listeners\ProjectBidSuperExpertNotification'
        ],
        'Fundator\Events\ProjectSuperExpertSelected' => [
            'Fundator\Listeners\ProjectSuperExpertSelectedtNotification'
        ],
        'Fundator\Events\ProjectExpertiseApproved' => [
            'Fundator\Listeners\ProjectExpertiseApprovedNotification'
        ],
        'Fundator\Events\ProjectExpertsApproved' => [
            'Fundator\Listeners\ProjectExpertsApprovedNotification'
        ],
        'Fundator\Events\ProjectBudgetApproved' => [
            'Fundator\Listeners\ProjectBudgetApprovedNotification'
        ],
        'Fundator\Events\ProjectFinanceApproved' => [
            'Fundator\Listeners\ProjectFinanceApprovedNotification'
        ],
        'Fundator\Events\ProjectInvestorsApproved' => [
            'Fundator\Listeners\ProjectInvestorsApprovedNotification'
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
    }
}
