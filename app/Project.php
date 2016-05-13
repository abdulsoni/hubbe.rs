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

    public function projectInvestmentAvailableAttributes(){
        $project_data = [];

        $project_data['id'] = $this->id;
        $project_data['name'] = $this->name;
        $project_data['thumbnail'] = $this->thumbnail;
        $project_data['description'] = $this->description;
        $project_data['super_expert'] = $this->superExpert;
        $project_data['finance'] = $this->projectFinance;

        return $project_data;
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
                            if (!is_null($expertise_item->selectedBid)) {
                                $amount_needed = $amount_needed + $expertise_item->selectedBid->bid_amount;
                            }
                        }
                    }

                    $projectFinance = $project->projectFinance;

                    if (is_null($projectFinance)) {
                        $projectFinance = $project->projectFinance()->create([
                            'fob_manufacturing_cost' => 0.0,
                            'fob_factory_price' => 0.0,
                            'fob_selling_price' => 0.0,
                            'gross_margin' => 0.0,
                            'base_budget' => floatval($amount_needed),
                            'adjustment_margin' => 10.0,
                            'self_funding_amount' => 0.0,
                            'funding_amount' => 0.0,
                            'payable_intrest' => 15,
                            'payback_duration' => 6,
                            'payback_duration_extended' => 0,
                            'investors_min' => 0,
                            'investors_max' => 0,
                            'investors_type' => 0,
                            'investors_message_creator' => '',
                            'investors_message_se' => ''
                        ]);
                    }

                    $projectFinance->save();
                    break;
            }
        });
    }
}
