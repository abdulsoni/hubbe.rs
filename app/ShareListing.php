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
     * Additional Attributes
     *
     * @var array
     */
    // protected $appends = ['total_amount', 'average_amount'];


    // public function getTotalAmountAttribute()
    // {
    //     return $this->bids->sum('bid_amount');
    // }

    // public function getAverageAmountAttribute()
    // {
    //     return $this->bids->avg('bid_amount');
    // }

    /**
     * User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo('Fundator\User')->select(['id', 'name']);
    }

    /**
     * Share Bids
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shareBids(){
    	return $this->hasMany('Fundator\ShareBid');
    }
}
