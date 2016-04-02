<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EnhanceProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects_table', function (Blueprint $table) {

            $table->integer('state')->default(0);

            // Step 1
            $table->float('price')->nullable();
            $table->string('language')->nullable();

            // Step 2

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects_table', function (Blueprint $table) {
            //
        });
    }
}
