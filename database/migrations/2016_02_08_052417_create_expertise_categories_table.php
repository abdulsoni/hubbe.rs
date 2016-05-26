<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpertiseCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expertise_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_id')->nullable();

            $table->string('name');
            $table->string('description');
            $table->string('background_color');
            $table->string('icon');
            $table->boolean('visible')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('expertise_categories');
    }
}
