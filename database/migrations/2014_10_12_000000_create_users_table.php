<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('thumbnail_id');

            $table->string('name');
            $table->string('last_name');
            $table->string('role');
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->boolean('needs_reset');
            $table->boolean('registered');

            $table->string('linkedin')->nullable();

            // Additional Fields

            $table->date('dob');
            $table->date('age_gate');
            $table->string('country_origin');
            $table->string('country_residence');
            $table->string('contact_number');
            $table->string('contact_time');

            $table->rememberToken();
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
        Schema::drop('users');
    }
}
