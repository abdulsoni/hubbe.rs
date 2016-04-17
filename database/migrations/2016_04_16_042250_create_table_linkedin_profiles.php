<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableLinkedinProfiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('linkedin_profiles', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id');
            $table->string('linkedin_id');
            $table->string('linkedin_token');

            $table->string('thumbnail_url');

            $table->string('email');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('position');
            $table->string('industry');

            // Location
            $table->string('country');
            $table->string('city');

            // Summary
            $table->text('summary');
            $table->longText('specialties');

            $table->string('profile_url');
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
        Schema::drop('linkedin_profiles');
    }
}
