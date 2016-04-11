<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Creator extends Model
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
    protected $table = 'creators';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $appends = ['name', 'last_name', 'thumbnail_url'];


    public function user(){
        return $this->belongsTo('Fundator\User');
    }

    public function entries()
    {
        return $this->hasMany('Fundator\Entry');
    }

    public function projects()
    {
        return $this->hasMany('Fundator\Project');
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

    public function getOngoingContests()
    {
        return $this->entries()->select('contest_id')->groupBy('contest_id')->lists('contest_id');
    }

    public function getAverageRating()
    {
        $entries = $this->entries;

        if(sizeof($entries) > 0){
            $averageSum = 0;

            foreach($entries as $entry){
                $averageSum = $averageSum + $entry->getAverageRating();
            }

            return $averageSum / sizeof($entries);
        }

        return 0;
    }
}
