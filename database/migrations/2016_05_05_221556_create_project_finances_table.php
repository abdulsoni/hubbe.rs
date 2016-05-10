<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectFinancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_finances', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id');

            // Cost & Margin
            $table->float('fob_manufacturing_cost');
            $table->float('fob_factory_price');
            $table->float('fob_selling_price');
            $table->float('gross_margin');

            // Funding
            $table->float('base_budget');
            $table->float('adjustment_margin');
            $table->float('self_funding_amount');
            $table->float('funding_amount');
            $table->integer('payable_intrest');

            $table->integer('payback_duration');
            $table->integer('payback_duration_extended');

            // Misc
            $table->integer('investors_min');
            $table->integer('investors_max');
            $table->integer('investors_type');

            $table->text('investors_message_creator');
            $table->text('investors_message_se');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('project_finances');
    }
}
