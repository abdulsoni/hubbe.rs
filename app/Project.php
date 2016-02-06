<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
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
    protected $table = 'projects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'status', 'start_time', 'duration', 'market', 'geography'];

    /**
     * Project Investment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function investments(){
        return $this->hasMany('Fundator\Investment');
    }
}
