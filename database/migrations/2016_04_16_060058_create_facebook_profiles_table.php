<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacebookProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facebook_profiles', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id');
            $table->string('facebook_id');
            $table->string('facebook_token');

            $table->string('thumbnail_url');

            $table->string('email');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('profile_url');
            $table->string('website');
            $table->string('birthday');
            $table->string('currency');
            $table->string('gender');

            // Bio
            $table->string('summary');
            $table->string('bio');

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
        Schema::drop('facebook_profiles');
    }
}
