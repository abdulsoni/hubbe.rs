<?php

namespace Fundator\Listeners;

use Fundator\Events\ProjectBidSuperExpert;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Fenos\Notifynder\Facades\Notifynder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class ProjectBidSuperExpertNotification
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
     * @param  ProjectBidSuperExpert  $event
     * @return void
     */
    public function handle(ProjectBidSuperExpert $event)
    {
        $project = $event->project;
        $user = $event->project->creator->user;
        $superExpert = $event->superExpert->user;

        $project_url = URL::to('/#/create/super-expert?projectId=' . $project->id);

        try{
            Notifynder::category('project.superExpertBid')
                ->from($user->id)
                ->to($user->id)
                ->url(URL::to('/'))
                ->extra([
                    'project' => ['id' => $project->id, 'name' => $project->name],
                    'user' => ['id' => $user->id, 'name' => $user->name],
                    'superExpert' => ['id' => $superExpert->id, 'name' => $superExpert->name],
                    'superExpertName' => $superExpert->name,
                    'thumbnail' => $superExpert->thumbnail_url,
                    'action' => 'app.create.superexpert({projectId: ' . $project->id . '})'
                ])
                ->send();

            Log::info('Super Expert bid sent: ' . $superExpert->name);

            // Mail::send('emails.project-bid-superexpert', ['user' => $user, 'project_url' => $project_url, 'project' => $project, 'superExpert' => $superExpert], function ($m) use ($user, $project, $superExpert) {
            //    $m->from('noreply@fundator.co', 'Fundator');

            //    $m->to($user->email, $user->name)->subject('Super Expert ' . $superExpert->name . ' has placed a bid on your project ' . '"' . $project->name . '"');
            // });

            Log::info('Super Expert bid email sent: ' . $superExpert->name);
        }catch(Exception $e){
            Log::error($e);
        }
    }
}
