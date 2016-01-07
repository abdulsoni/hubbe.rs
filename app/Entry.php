<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
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
    protected $table = 'entries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

    /**
     * Relationship between Entries and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function contests()
    {
        return $this->belongsTo('Fundator\Contest');
    }

    /**
     * Relationship between Entry Revisions
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function revisions()
    {
        return $this->hasMany('Fundator\EntryRevision');
    }

    /**
     * Relationship between Entries and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contest()
    {
        return $this->belongsTo('Fundator\Contest');
    }
}
