<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class ShareListing extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'share_listings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'start_date', 'duration', 'num_shares', 'reserve_amount'];

    /**
     * User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
    	return $this->belongsTo('Fundator\User');
    }
}
