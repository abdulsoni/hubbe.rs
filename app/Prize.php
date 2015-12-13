<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Prize extends Model
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
    protected $table = 'prizes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['description', 'prize', 'currency', 'royalty'];

    /**
     * Relationship between Entries and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function contest()
    {
        return $this->belongsTo('Fundator\Contest');
    }
}
