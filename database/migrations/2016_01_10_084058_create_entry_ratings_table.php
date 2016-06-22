<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntryRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entry_ratings', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('entry_id');
            $table->integer('judge_id');

            $table->float('design');
            $table->float('creativity');
            $table->float('industrial');
            $table->float('market');

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
        Schema::drop('entry_ratings');
    }
}
