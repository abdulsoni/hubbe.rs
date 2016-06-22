<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class ExpertiseCategory extends Model
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
    protected $table = 'expertise_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'visible', 'icon', 'background_color'];

    /**
     * Parent Link
     */
    public function parent()
    {
        return $this->belongsTo('Fundator\ExpertiseCategory', 'parent_id');
    }
}
