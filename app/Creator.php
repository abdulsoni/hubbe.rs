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


    public function user(){
        return $this->belongsTo('Fundator\User');
    }
}
