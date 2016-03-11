<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Expertise extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expertise';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'visible'];

    /**
     * Connected Expert
     */
    public function experts(){
        return $this->belongsToMany('Fundator\Expert', 'expert_expertise');
    }

    /**
     * Expertise Category Connection
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function expertiseCategory()
    {
        return $this->belongsTo('Fundator\ExpertiseCategory');
    }

    /**
     * Expertise Skills
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function skills()
    {
        return $this->belongsToMany('Fundator\Skill', 'expertise_skills');
    }
}
