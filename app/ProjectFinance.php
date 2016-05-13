<?php

namespace Fundator;

use Illuminate\Database\Eloquent\Model;

class ProjectFinance extends Model
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
    protected $table = 'project_finances';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['base_budget', 'fob_manufacturing_cost', 'fob_factory_price', 'fob_selling_price', 'gross_margin', 'adjustment_margin', 'self_funding_amount', 'funding_amount', 'payable_intrest', 'payback_month', 'payback_duration', 'payback_duration_extended', 'investors_min', 'investors_max', 'investors_type', 'investors_message_creator', 'investors_message_se'];
}
