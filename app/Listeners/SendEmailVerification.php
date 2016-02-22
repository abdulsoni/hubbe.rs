<?php

namespace Fundator\Listeners;

use Fundator\Events\Signup;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Exception;
use Illuminate\Support\Facades\Mail;

class SendEmailVerification
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
     * @param  Signup  $event
     * @return void
     */
    public function handle(Signup $event)
    {
        $user = $event->user;

        try{
            Mail::send('emails.verify', ['user' => $user], function ($m) use ($user) {
                $m->from('noreply@fundator.co', 'Fundator');

                $m->to($user->email, $user->name)->subject('Verify your email address with Fundator');
            });
        }catch(Exception $e){
            Log::error($e);
        }
    }
}
