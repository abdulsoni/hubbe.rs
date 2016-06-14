<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class InnovationCategory extends Model
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
    protected $table = 'innovation_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'visible'];

    /**
     * Parent Link
     */
    public function parent()
    {
        return $this->belongsTo('Fundator\InnovationCategory', 'parent_id');
    }
}
