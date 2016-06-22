<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;
use Cmgmyr\Messenger\Models\Thread;

class ProjectInvestmentBid extends Model
{
   /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'project_investment_bids';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['bid_amount_min', 'bid_amount_max', 'description'];

    protected $appends = ['thread_id'];

    /**
     * User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function investor(){
        return $this->belongsTo('Fundator\Investor');
    }

    /**
     * Share Listing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project(){
    	return $this->belongsTo('Fundator\Project');
    }

    /*
     * Messages
     */
    public function getThreadIdAttribute()
    {
        $threadSubject = 'Discussion with investor : ' . $this->investor->id . ' on ' . $this->project->id;
        $thread = Thread::where('subject', $threadSubject)->first();

        if(!is_null($thread)){
            return $thread->id;
        }else{
            $thread = Thread::create(['subject' => $threadSubject]);
            return $thread->id;
        }

        return null;
    }
}
