<?php

namespace Fundator;

use Fundator\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use GetStream\StreamLaravel\Eloquent\ActivityTrait;
class ContestantApplication extends Model
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
    protected $table = 'contestant_applications';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status'];

    /**
     * Attachment to the user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo('Fundator\User');
    }

    public function is_following(){
        return $this->belongsTo('Fundator\Followers','user_id','user_id');
    }
    /**
     * Attachment to the contest
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contest(){
        return $this->belongsTo('Fundator\Contest','contest_id','id');
    }

    /**
     * Auto assign the jury
     */
    public static function boot()
    {
        parent::boot();

        static::saved(function($model){
            if (is_null($model->user)) return;

        	if (is_null($model->user->creator)) {
        		$creator = Role::where('name', 'creator')->first();
        		$model->user->roles()->attach($creator->id);

        		$model->user->creator()->create([]);
        	}

        	Log::info($model->user->creator);

            $original = $model->getOriginal();

            if (isset($original['status'])) {
	            if ($model->status && ($original['status'] != $model->status)) {
	                Log::info('Updating / Saving ' . $model->status);
	            	// Event::fire(new AssignJury($model->contest, $model->user));
	            }
            }
        });
    }
}
