<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectSuperExpertSelected;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Fenos\Notifynder\Facades\Notifynder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class ProjectSuperExpertSelectedtNotification
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
     * @param  ProjectSuperExpertSelected  $event
     * @return void
     */
    public function handle(ProjectSuperExpertSelected $event)
    {
        $project = $event->project;
        $user = $event->superExpert->user;

        try{
            Notifynder::category('project.superExpertSelected')
                ->from($user->id)
                ->to($user->id)
                ->url(URL::to('/'))
                ->extra([
                    'project' => ['id' => $project->id, 'name' => $project->name],
                    'user' => ['id' => $user->id, 'name' => $user->name],
                    'thumbnail' => $project->thumbnail,
                    'action' => null
                ])
                ->send();

            Log::info('Super Expert selected notified: ' . $user->name);

            // Mail::send('emails.project-selected-superexpert', ['user' => $user, 'project' => $project], function ($m) use ($user, $project) {
            //    $m->from('noreply@fundator.co', 'Fundator');

            //    $m->to($user->email, $user->name)->subject('You have been selected as the Super Expert on the project ' . '"' . $project->name . '"');
            // });

            Log::info('Super Expert selected notified: ' . $user->name);
        }catch(Exception $e){
            Log::error($e);
        }
    }
}
