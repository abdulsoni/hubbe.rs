<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Fundator\ProjectFinance;

class Project extends Model
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
    protected $table = 'projects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'state', 'thumbnail', 'start_time', 'duration', 'market', 'geography', 'price', 'language'];

    /**
     * User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator(){
        return $this->belongsTo('Fundator\Creator');
    }

    /**
     * Project Investment
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function investments(){
        return $this->hasMany('Fundator\Investment');
    }

    /**
     * Project Investment
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function expertise(){
        return $this->hasMany('Fundator\ProjectExpertise');
    }

    /**
     * Super Expert
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function superExpert(){
        return $this->belongsTo('Fundator\Expert', 'super_expert_id');
    }

    /**
     * Project Finance
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function projectFinance(){
        return $this->hasOne('Fundator\ProjectFinance');
    }

    public function thumbnailUrl(){
        return URL::to('/' . $this->thumbnail);
    }

    public function projectCreatorAttributes(){
        return $this->getAttributes();
    }

    public function projectExpertAttributes(){
        return $this->getAttributes();
    }

    public function projectInvestorAttributes(){
        return $this->getAttributes();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::updated(function (Project $project)
        {
            switch($project->state){
                case 4:
                    $amount_needed = 0.0;

                    if (!is_null($project->expertise)) {
                        $expertise = $project->expertise;

                        foreach ($expertise as $expertise_item) {
                            $amount_needed = $amount_needed + $expertise_item->selectedBid->bid_amount;
                        }
                    }

                    $projectFinance = $project->projectFinance;

                    if (is_null($projectFinance)) {
                        $projectFinance = ProjectFinance::create([]);
                    }

                    $projectFinance->amount_needed = $amount_needed;
                    $projectFinance->save();
                    break;
            }
        });
    }
}
