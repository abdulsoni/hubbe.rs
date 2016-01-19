<?php

namespace Fundator\Listeners;

use Fenos\Notifynder\Facades\Notifynder;
use Fundator\Events\Register;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Exception;

class SendRegistrationNotification
{
    public $login_url;

    /**
     * Create the event listener.
     *
     */
    public function __construct()
    {
        // Load the email template
        $this->login_url = URL::to('/#/login');
    }

    /**
     * Handle the event.
     *
     * @param  Register  $event
     * @return void
     */
    public function handle(Register $event)
    {
        $user = $event->user;

        try{
//            Notifynder::category('user.created')
//                ->from($user->id)
//                ->to($user->id)
//                ->url(URL::to('/'))
//                ->send();

            Log::info('Sending email to : ' . $user->email);

            Mail::send('emails.register', ['user' => $user, 'login_url' => $this->login_url], function ($m) use ($user) {
                $m->from('noreply@fundator.co', 'Fundator');

                $m->to($user->email, $user->name)->subject('You have successfully registered on Fundator!');
            });
        }catch(Exception $e){
            Log::error($e);
        }
    }
}
