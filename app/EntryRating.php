<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class EntryRating extends Model
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
    protected $table = 'entry_ratings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['design', 'creativity', 'industrial', 'market'];

    /**
     * Relationship between
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function entry()
    {
        return $this->belongsTo('Fundator\Entry');
    }

    /**
     * Relationship between
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function judge()
    {
        return $this->belongsTo('Fundator\User', 'judge_id')->select('id', 'name');
    }
}
