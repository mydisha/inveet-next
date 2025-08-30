<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wedding_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('wedding_id')
                ->unsigned()
                ->index();
            $table->string('key')
                ->index();
            $table->string('value')
                ->nullable();
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
        Schema::dropIfExists('wedding_details');
    }
};
