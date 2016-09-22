<?php

namespace Fundator\Listeners;

use Fundator\Events\ProfileUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use GetStream\StreamLaravel\Facades\FeedManager;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileUpdatedNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(){

    }

    /**
     * Handle the event.
     *
     * @param  ProjectExpertiseApproved  $event
     * @return void
     */
    public function handle(ProfileUpdated $event){
        $user = $event->user;

        if (!$userDetails = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }
        $activityData = [
            'actor'=>$userDetails->id,
            'verb'=>'Profile Updation',
            'object'=>0,
            'display_message'=>$user->oldName." Changes To ".$user->fullName
        ];
        $userFeed = FeedManager::getUserFeed($userDetails->id);
        $userFeed->addActivity($activityData);
    }
}
