<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreationCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("creation_categories", function(Blueprint $table){
            $table->increments("id");
            $table->integer('parent_id')->nullable();
            $table->string('name');
            $table->text('description');
            $table->boolean('visible')->default(true);
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('creation_categories');
    }
}
