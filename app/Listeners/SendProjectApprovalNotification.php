<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectApproved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Fenos\Notifynder\Facades\Notifynder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class SendProjectApprovalNotification
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
     * @param  ProjectApproved  $event
     * @return void
     */
    public function handle(ProjectApproved $event)
    {
        $project = $event->project;
        $user = $event->project->creator->user;

        $project_url = URL::to('/#/create/details?projectId=' . $project->id);

        try{
            Notifynder::category('project.approved')
                ->from($user->id)
                ->to($user->id)
                ->url(URL::to('/'))
                ->extra([
                    'project' => ['id' => $project->id, 'name' => $project->name],
                    'user' => ['id' => $user->id, 'name' => $user->name],
                    'thumbnail' => $project->thumbnail,
                    'action' => 'app.create.details({projectId: ' . $project->id . '})'
                ])
                ->send();

            Log::info('Project Approved : ' . $project->name);

            Mail::send('emails.project-approved', ['user' => $user, 'project_url' => $project_url, 'project' => $project], function ($m) use ($user, $project) {
               $m->from('noreply@fundator.co', 'Fundator');

               $m->to($user->email, $user->name)->subject('Your project "' . $project->name . '" has been approved on Fundator!');
            });

            Log::info('Project Approved Email sent: ' . $project->name);
        }catch(Exception $e){
            Log::error($e);
        }
    }
}
