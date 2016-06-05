<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Contest extends Model
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
    protected $table = 'contests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'status', 'start_time', 'duration', 'budget', 'currency'];

    /**
     * Appended Attributes
     *
     * @var array
     */
    protected $appends = ['num_contestants'];

    /**
     * Get the number of contestants
     */
    // public function getNumContestantsAttribute()
    // {
    //     return $contestants = $this->entries->groupBy('creator_id')->count();
    // }

    /**
     * Relationship between Entries and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function entries()
    {
        return $this->hasMany('Fundator\Entry');
    }

    /**
     * Attachment to the contest
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contestants(){
        return $this->hasMany('Fundator\ContestantApplication')->where('status', 1);
    }

    /**
     * Active Jury
     */
    public function jury()
    {
        // return $this->belongsToMany('Fundator\User', 'contest_jury', null, 'judge_id');
        return $this->hasMany('Fundator\JuryApplication')->where('status', 1);
    }

    /**
     * Relationship between Prizes and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function prizes()
    {
        return $this->hasMany('Fundator\Prize');
    }

    /**
     * Relationship between Skills and Contests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function skills()
    {
        return $this->belongsToMany('Fundator\Skill', 'contest_skills');
    }

    /**
     * Number of contestants
     */
    public function getNumContestantsAttribute() {
        return $this->contestants()->count();
    }

    /**
     * Judge Entries
     */
    public function unmarkedEntries()
    {
        if (!isset($_REQUEST['token']) || is_null($_REQUEST['token'])) {
            return null;
        }

        $user = JWTAuth::parseToken()->authenticate();

        $contestId = $this->id;
        $judgeableContests = JuryApplication::where('user_id', $judgeId)->where('contest_id', $contestId)->where('status', 1)->first();
        $unmarkedEntries = null;

        if (!is_null($judgeableContests)) {
            $entries = Entry::where('contest_id', $contestId)->get();
            $unmarkedEntries = 0;

            foreach ($entries as $entry) {
                if (is_null($entry->ratings)) {
                    $unmarkedEntries++;
                }
            }
        }

        return $unmarkedEntries;
    }
}
