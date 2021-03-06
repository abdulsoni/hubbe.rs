<?php

namespace Fundator\Listeners;

use Fundator\Events\AssignJury;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Fenos\Notifynder\Facades\Notifynder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

use Exception;

class SendJuryInvitationNotification
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
     * @param  AssignJury  $event
     * @return void
     */
    public function handle(AssignJury $event)
    {
        $contest = $event->contest;
        $user = $event->user;

        $contest_url = URL::to('/#/contests/' . $contest->id);

        try{
            Notifynder::category('jury.invited')
                ->from($user->id)
                ->to($user->id)
                ->url(URL::to('/'))
                ->extra([
                    'contest' => ['id' => $contest->id, 'name' => $contest->name],
                    'user' => ['id' => $user->id, 'name' => $user->name],
                    'thumbnail' => $contest->thumbnail,
                    'action' => 'app.contest({contestId: ' . $contest->id . '})'
                ])
                ->send();

            Log::info('Jury Notified : ' . $user->name);

            Mail::send('emails.jury-invited', ['user' => $user, 'contest_url' => $contest_url, 'contest' => $contest], function ($m) use ($user, $contest) {
               $m->from('noreply@fundator.co', 'Fundator');

               $m->to($user->email, $user->name)->subject('You have been invited to judge the contest ' . $contest->name);
           });
        }catch(Exception $e){
            Log::error($e);
        }
    }
}
