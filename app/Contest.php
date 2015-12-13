<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Contest extends Model
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
    protected $table = 'contests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * Relationship between
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function contestants()
    {
        return $this->belongsToMany('Fundator\User', 'contestants');
    }

    /**
     * Relationship between Entries and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function entries()
    {
        return $this->belongsToMany('Fundator\Entry', 'contestants');
    }

    /**
     * Relationship between Prizes and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function prizes()
    {
        return $this->hasMany('Fundator\Prize');
    }

    /**
     * Relationship between Skills and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function skills()
    {
        return $this->belongsToMany('Fundator\Skill', 'contest_skills');
    }
}
