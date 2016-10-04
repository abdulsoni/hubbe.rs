<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contests', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('status');
            $table->string('thumbnail');

            $table->string('name');
            $table->longText('description');
            $table->longText('rules');
            $table->dateTime('start_time');
            $table->integer('duration');

            // $table->float('budget');
            $table->boolean('visible');
            $table->string('country');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('contests');
    }
}
