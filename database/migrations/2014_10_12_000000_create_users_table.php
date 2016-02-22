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

            $table->string('facebook')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('google')->nullable();
            $table->string('twitter')->nullable();

            // Additional Fields
            $table->string('gender');
            $table->date('dob');
            $table->boolean('age_gate');
            $table->string('country_origin');
            $table->string('country_residence');
            $table->string('contact_number');
            $table->string('contact_time');

            $table->boolean('confirmed')->default(0);
            $table->string('confirmation_code')->nullable();

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
