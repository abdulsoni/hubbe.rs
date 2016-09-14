<?php

namespace Fundator\Events;

use Fundator\Events\Event;
use Fundator\Project;
use Fundator\Expert;
use Illuminate\Queue\SerializesModels;
use GetStream\StreamLaravel\Facades\FeedManager;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProjectSuperExpertSelected extends Event{
    use SerializesModels;
    /**
     * Create a new event instance.
     *
     * @return voidp
     */
    public function __construct(Project $project, Expert $superExpert){
        $creator = $project->creator;
        $userDetails = $superExpert->user;
        //Add Activity
        $activityData = [
            'actor'=>$creator->id,
            'verb'=>'Superexpert Assigned',
            'object'=>$project->id,
            'display_message'=>"$creator->name has choosen <b>$userDetails->name</b>  as a super expert for his project $project->name"
        ];
        $userFeed = FeedManager::getUserFeed($creator->id);
        $userFeed->addActivity($activityData);
        $this->project = $project;
        $this->superExpert = $superExpert;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn(){
        return [];
    }
}
