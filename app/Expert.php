<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Expert extends Model
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
    protected $table = 'experts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['super_expert'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $appends = ['name', 'last_name', 'thumbnail_url'];


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

    public function user(){
        return $this->belongsTo('Fundator\User');
    }

    public function user2(){
        return $this->belongsTo('Fundator\User','user_id','id');
    }

    public function expertise(){
        return $this->belongsToMany('Fundator\Expertise', 'expert_expertise');
    }

    public function skills(){
        return $this->belongsToMany('Fundator\Skill', 'expert_skills');
    }
}
