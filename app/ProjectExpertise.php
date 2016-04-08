<?php

namespace Fundator;

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
    protected $appends = ['expertise', 'expertise_category', 'expertise_subcategory', 'expertise', 'confirmation'];

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
     * Confirmation
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function confirmation()
    {
        return $this->morphMany('Fundator\Confirm', 'confirmable');
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
}
