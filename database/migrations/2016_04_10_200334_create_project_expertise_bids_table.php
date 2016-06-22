<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectExpertiseBidsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_expertise_bids', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('project_expertise_id');
            $table->integer('expert_id');

            $table->float('bid_amount');
            $table->text('description');

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
        Schema::drop('project_expertise_bids');
    }
}
