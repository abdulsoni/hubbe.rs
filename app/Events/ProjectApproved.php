<?php

namespace Fundator\Events;

use Fundator\Events\Event;
use Fundator\Project;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use GetStream\StreamLaravel\Facades\FeedManager;

class ProjectApproved extends Event
{
    use SerializesModels;

    public $project;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Project $project)
    {
        $creator = $project->creator;
        //Add Activity
        $activityData = [
            'actor'=>$creator->id,
            'verb'=>'Project Created',
            'object'=>$project->id,
            'display_message'=>$creator->name." has Created a project named ".$project->name." on ".date('d/M/Y',strtotime($project->created_at))
        ];
        $userFeed = FeedManager::getUserFeed($creator->id);
        $userFeed->addActivity($activityData);
        $this->project = $project;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
