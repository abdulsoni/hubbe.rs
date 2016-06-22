<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class LinkedinProfile extends Model
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
    protected $table = 'linkedin_profiles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['thumbnail_url', 'email', 'first_name', 'last_name', 'position', 'industry', 'country', 'city', 'summary', 'specialties', 'profile_url'];

    /**
     * Attachemnt to the parent user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('Fundator\User');
    }
}
