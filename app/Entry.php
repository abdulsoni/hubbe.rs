<?php

namespace Fundator;

use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
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
    protected $table = 'entries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

    /**
     * Appends custom attributes
     *
     * @var array
     */
    protected $appends = ['contestant'];

    /**
     * Relationship between Entry Rating
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function ratings()
    {
        return $this->hasMany('Fundator\EntryRating');
    }

    /**
     * Relationship between Entries and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo('Fundator\Creator');
    }

    /**
     * Relationship between Entries and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contest()
    {
        return $this->belongsTo('Fundator\Contest');
    }

    /**
     * Relationship between Entries and Files
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function files()
    {
        return $this->belongsToMany('Fundator\File', 'entry_files')->withPivot('caption');
    }

    public function getContestantAttribute()
    {
        $creator = Creator::find($this->creator_id);
        $creator_data = null;

        if (!is_null($creator)) {
            $user = $creator->user;

            $creator_data = [
                'id' => $user['id'],
                'name' => $user['name'],
                'last_name' => $user['last_name'],
                'thumbnail' => $user['thumbnail']
            ];
        }

        return $creator_data;
    }

    public function getThreadId()
    {
        $threadSubject = '#' . $this->id . ' ' . $this->name;
        $thread = Thread::where('subject', $threadSubject)->first();

        if(!is_null($thread)){
            return $thread->id;
        }

        return null;
    }

    public function getThread()
    {
        $threadSubject = '#' . $this->id . ' ' . $this->name;
        $thread = Thread::where('subject', $threadSubject)->first();

        if(!is_null($thread)){
            return $thread;
        }

        return null;
    }

    public function getAverageRating()
    {
        $ratings = $this->ratings;

        if(sizeof($ratings) > 0){
            $averageSum = 0;

            foreach($ratings as $rating){
                $averageSum = $averageSum + ($rating->design + $rating->creativity + $rating->industrial + $rating->market) / 4;
            }

            return $averageSum / sizeof($ratings);
        }

        return 0;
    }


    /**
     * Override the get attributes function
     *
     */
    public function getAttributes()
    {
        $attributes = $this->toArray();

        return $attributes;
    }

    /**
     *
     */
    public static function boot()
    {
        parent::boot();

        static::saved(function($entry){
            $thread = Thread::create([
                'subject' => '#' . $entry->id . ' ' . $entry->name,
            ]);

            if(!is_null($entry->contest)){
                $judges = $entry->contest->jury;

                foreach($judges as $judge){
                    if(is_null(Participant::where('user_id', $judge->id)->first())){
                        Participant::create([
                            'thread_id' => $thread->id,
                            'user_id'   => $judge->id,
                            'last_read' => new Carbon,
                        ]);
                    }
                }
            }

            if(!is_null($entry->creator)){
                $creator = $entry->creator->user;

                if(is_null(Participant::where('user_id', $creator->id)->first())) {
                    Participant::create([
                        'thread_id' => $thread->id,
                        'user_id' => $creator->id,
                        'last_read' => new Carbon,
                    ]);
                }
            }

        });
    }
}
