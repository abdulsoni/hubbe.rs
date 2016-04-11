<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Project extends Model
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
    protected $table = 'projects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'state', 'thumbnail', 'start_time', 'duration', 'market', 'geography', 'price', 'language'];

    /**
     * User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator(){
        return $this->belongsTo('Fundator\Creator');
    }

    /**
     * Project Investment
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function investments(){
        return $this->hasMany('Fundator\Investment');
    }

    /**
     * Project Investment
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function expertise(){
        return $this->hasMany('Fundator\ProjectExpertise');
    }

    /**
     * Super Expert
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function superExpert(){
        return $this->belongsTo('Fundator\Expert', 'super_expert_id');
    }

    // public function thumbnailUrl(){
    //     return URL::to('/' . $this->thumbnail);
    // }
}
