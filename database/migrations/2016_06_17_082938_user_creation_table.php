<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserCreationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("user_creation",function(Blueprint $table){
            $table->increments("id");
            $table->integer("user_id");
            $table->integer("creation_id");
            $table->timestamp("created_at");
            $table->timestamp("updated_at");
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        schema::drop("user_creation");
    }
}
