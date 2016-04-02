<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfirmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('confirms', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('confirmable_id');
            $table->string('confirmable_type');

            $table->integer('sender_id');
            $table->integer('receiver_id');
            $table->boolean('confirm_status')->default(0);
            $table->dateTime('confirm_time')->nullable();

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
        Schema::drop('confirms');
    }
}
