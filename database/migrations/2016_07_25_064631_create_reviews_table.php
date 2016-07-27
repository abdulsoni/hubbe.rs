<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('rec_user_id');
            $table->integer('rec_role_id');
            $table->integer('sender_user_id');
            $table->integer('rate1');
            $table->integer('rate2');
            $table->integer('rate3');
            $table->integer('rate4');
            $table->text('comment');

            //ALTER TABLE reviews ADD rec_user_id INT AFTER id;
            //ALTER TABLE reviews ADD rec_role_id INT AFTER rec_user_id;
            //ALTER TABLE reviews ADD sender_user_id INT AFTER rec_role_id;
            //ALTER TABLE reviews ADD rate1 INT AFTER sender_user_id;
            //ALTER TABLE reviews ADD rate2 INT AFTER rate1;
            //ALTER TABLE reviews ADD rate3 INT AFTER rate2;
            //ALTER TABLE reviews ADD rate4 INT AFTER rate3;
            //ALTER TABLE reviews ADD comment TEXT AFTER rate4;

            $table->boolean('visible')->default(true);


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
        Schema::drop('reviews');
    }
}
