<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJuryApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jury_applications', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('contest_id');
            $table->boolean('status')->default(false);
            $table->timestamps();

            $table->primary(array('user_id', 'contest_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('jury_applications');
    }
}
