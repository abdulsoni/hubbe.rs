<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectInvestmentBidsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_investment_bids', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('project_id');
            $table->integer('investor_id');

            $table->float('bid_amount_min');
            $table->float('bid_amount_max');
            $table->text('description');

            $table->string('type');

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
        Schema::drop('project_investment_bids');
    }
}
