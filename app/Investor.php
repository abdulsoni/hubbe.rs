<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Investor extends Model
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
    protected $table = 'investors';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['investment_budget', 'investment_goal', 'investment_reason'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $appends = ['name', 'last_name', 'thumbnail_url'];

    /**
     * Attachemnt to the parent user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('Fundator\User');
    }

    /**
     * Project Investment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function investments()
    {
        return $this->hasMany('Fundator\Investment');
    }


    public function getNameAttribute()
    {
        return $this->user->name;
    }

    public function getLastNameAttribute()
    {
        return $this->user->last_name;
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->user->thumbnail_url;
    }

}