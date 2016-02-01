<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Investor extends Model
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
    protected $table = 'investors';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['investment_budget', 'investment_goal', 'investment_reason'];

    /**
     * Attachemnt to the parent user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo('Fundator\User');
    }
}