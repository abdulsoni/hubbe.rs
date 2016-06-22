<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class Investment extends Model
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
    protected $table = 'investments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type', 'amount', 'equity'];

    /**
     * Attachment to the investor
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function investor(){
        return $this->belongsTo('Fundator\Investor');
    }

    /**
     * Project Investment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project(){
        return $this->belongsTo('Fundator\Project');
    }
}
