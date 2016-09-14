<?php

namespace Fundator;

use Fundator\Events\AssignJury;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Event;

class JuryApplication extends Model
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
    protected $table = 'jury_applications';

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

    /**
     * Attachment to the contest
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contest(){
        return $this->belongsTo('Fundator\Contest');
    }



    /**
     * Auto assign the jury
     */
    public static function boot()
    {
        parent::boot();

        static::saved(function($model){

            $original = $model->getOriginal();

            if (isset($original['status'])) {
                if ($model->status && ($original['status'] != $model->status)) {
                    Log::info('Updating / Saving ' . $model->status);
                	Event::fire(new AssignJury($model->contest, $model->user));
                }
            }
        });
    }
}
