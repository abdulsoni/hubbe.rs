<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectExpertiseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_expertise', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id');
            $table->integer('expertise_id');
            $table->integer('expert_id');

            $table->longtext('task');
            $table->string('budget');
            $table->string('lead_time');
            $table->dateTime('start_date');

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
        Schema::drop('project_expertise');
    }
}
