<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('creator_id');

            $table->boolean('draft'); // Draft or Not Draft
            $table->string('thumbnail');
            $table->dateTime('start_time');
            $table->integer('duration');

            // Step 1
            $table->string('name')->nullable();
            $table->mediumText('description')->nullable();
            $table->mediumText('market')->nullable();
            $table->json('geography')->nullable();

            $table->double('price')->nullable();

            $table->integer('product_category_id')->nullable();
            $table->integer('innovation_category_id')->nullable();

            // Step 2

            // Extra Attributes
            $table->boolean('display');
            $table->float('state');
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
        Schema::drop('projects');
    }
}
