<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Judge extends Model
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
    protected $table = 'judges';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

//    /**
//     * Contest
//     *
//     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
//     */
//    public function contests()
//    {
//        return $this->belongsToMany('Fundator\Contest', 'contest_jury');
//    }
}
