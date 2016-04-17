<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class FacebookProfile extends Model
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
    protected $table = 'facebook_profiles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['thumbnail_url', 'email', 'first_name', 'last_name', 'summary', 'profile_url', 'bio', 'website', 'birthday', 'currency', 'gender'];

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
