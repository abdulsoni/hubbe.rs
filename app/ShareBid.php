<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class ShareBid extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'share_bids';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['num_shares', 'bid_amount'];

    /**
     * User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo('Fundator\User');
    }

    /**
     * Share Listing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shareListing(){
    	return $this->belongsTo('Fundator\shareListing');
    }
}
