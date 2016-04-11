<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class ProjectExpertiseBid extends Model
{
   /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'project_expertise_bids';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['bid_amount', 'description'];

    /**
     * User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function expert(){
        return $this->belongsTo('Fundator\Expert');
    }

    /**
     * Share Listing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function projectExpertise(){
    	return $this->belongsTo('Fundator\ProjectExpertise');
    }
}
