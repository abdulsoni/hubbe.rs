<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShareListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('share_listings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');

            $table->string('title');

            $table->dateTime('start_date');
            $table->integer('duration');

            $table->integer('num_shares');
            $table->float('reserve_amount');

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
        Schema::drop('share_listings');
    }
}
