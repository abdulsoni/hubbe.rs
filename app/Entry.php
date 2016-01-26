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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function contest()
    {
        return $this->belongsTo('Fundator\Contest');
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

    /**
     *
     */
    public static function boot()
    {
        parent::boot();

        static::created(function($entry){
            $thread = Thread::create([
                'subject' => '#' . $entry->id . ' ' . $entry->name,
            ]);

            $judges = $entry->contest->jury;

            foreach($judges as $judge){
                Participant::create([
                    'thread_id' => $thread->id,
                    'user_id'   => $judge->id,
                    'last_read' => new Carbon,
                ]);
            }

            $creator = $entry->creator->user;

            Participant::create([
                'thread_id' => $thread->id,
                'user_id'   => $creator->id,
                'last_read' => new Carbon,
            ]);

        });
    }
}
