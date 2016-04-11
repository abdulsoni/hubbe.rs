<?php

namespace Fundator;

use Fundator\Project;
use Fundator\Expertise;
use Fundator\Confirm;
use Cmgmyr\Messenger\Models\Thread;

use Illuminate\Database\Eloquent\Model;

class ProjectExpertise extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'project_expertise';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['task', 'budget', 'lead_time', 'start_date'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['project_id', 'expertise_id'];

    /**
     * Appended Attributes
     *
     * @var array
     */
    protected $appends = ['project', 'expertise', 'expertise_category', 'expertise_subcategory', 'expertise', 'confirmation', 'bids'];

    /**
     * Project Attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project()
    {
        return $this->belongsTo('Fundator\Project');
    }

    /**
     * Attachment to the contest
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function expertise()
    {
        return $this->belongsTo('Fundator\Expertise');
    }

    /**
     * Attachment to the bids
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bids()
    {
        return $this->hasMany('Fundator\ProjectExpertiseBid');
    }

    /**
     * Confirmation
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function confirmation()
    {
        return $this->morphMany('Fundator\Confirm', 'confirmable');
    }

    public function getProjectAttribute()
    {
        $project = Project::find($this->project_id);
        $project_data = null;

        if (!is_null($project)) {
            $project_data = [
                'id' => $project->id,
                'name' => $project->name,
                'thumbnail' => $project->thumbnail_url,
                'creator' => $project->creator,
                'super_expert' => $project->superExpert
            ];
        }

        return $project_data;
    }

    public function getExpertiseAttribute()
    {
        $expertise = Expertise::find($this->expertise_id);

        return $expertise;
    }

    public function getExpertiseSubcategoryAttribute()
    {
        $expertise = Expertise::find($this->expertise_id);

        return $expertise->expertiseCategory;
    }

    public function getExpertiseCategoryAttribute()
    {
        $expertise = Expertise::find($this->expertise_id);

        return $expertise->expertiseCategory->parent;
    }

    public function getConfirmationAttribute()
    {
        $confirmation = Confirm::where('confirmable_id', $this->id)->where('confirmable_type', 'Fundator\ProjectExpertise')->first();
        return $confirmation;
    }

    public function getBidsAttribute()
    {
        $bids = ProjectExpertiseBid::where('project_expertise_id', $this->id)->get();

        foreach ($bids as $bid) {
            $expert = Expert::find($bid->expert_id);
            $bid['expert'] = $expert;
            $bid['thread_id'] = $this->getThreadId($expert->id);
        }

        return $bids;
    }

    /*
     * Messages
     */
    public function getThreadId($expertId)
    {
        $threadSubject = 'Discussion with expert : ' . $this->expertId . ' on ' . $this->id;
        $thread = Thread::where('subject', $threadSubject)->first();

        if(!is_null($thread)){
            return $thread->id;
        }else{
            $thread = Thread::create(['subject' => $threadSubject]);
            return $thread->id;
        }

        return null;
    }
}
