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
            $table->float('fob_svg_selling_price');
            $table->float('gross_margin');

            // Funding
            $table->float('amount_needed');
            $table->float('self_funding_amount');
            $table->float('funding_amount');
            $table->integer('yearly_interest');

            $table->integer('payback_duration');
            $table->integer('payback_duration_extension');

            // Misc
            $table->integer('investors_min');
            $table->integer('investors_max');
            $table->integer('investors_type');

            $table->integer('investors_message_creator');
            $table->integer('investors_message_se');

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
